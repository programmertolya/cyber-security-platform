import React, { useState, useRef, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    type DragStartEvent,
    type DragEndEvent,
    useDraggable,
    useDroppable,
    type Modifier,
    pointerWithin, 
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { snapCenterToCursor } from '@dnd-kit/modifiers';

interface GameProps {
    onSaveScore?: (score: number) => void;
}

interface TechItem {
    id: string;
    label: string;
}

const INITIAL_TECH: TechItem[] = [
    { id: 't1', label: '4G' }, { id: 't2', label: 'Ethernet' },
    { id: 't3', label: '4G' }, { id: 't4', label: '3G' },
    { id: 't5', label: 'EDGE/GPRS' }, { id: 't6', label: 'WiFi' },
    { id: 't7', label: '3G' }, { id: 't8', label: 'WiFi' },
];

const CORRECT_MAPPING: Record<string, string[]> = {
    mobile: ['4G', '3G', 'EDGE/GPRS', 'WiFi'],
    laptop: ['4G', 'Ethernet', '3G', 'WiFi'],
};

export const InternetConnectionGame: React.FC<GameProps> = ({ onSaveScore }) => {
    const [pool, setPool] = useState<TechItem[]>(INITIAL_TECH);
    const [slots, setSlots] = useState<{ mobile: (TechItem | null)[]; laptop: (TechItem | null)[] }>({
        mobile: [null, null, null, null],
        laptop: [null, null, null, null],
    });
    const [activeId, setActiveId] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const BASE_WIDTH = 850;

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
                const newScale = Math.min((parentWidth - 40) / BASE_WIDTH, 1);
                setScale(newScale);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const translateScaleModifier: Modifier = ({ transform }) => {
        return {
            ...transform,
            x: transform.x / scale,
            y: transform.y / scale,
        };
    };

    const handleDragStart = (e: DragStartEvent) => setActiveId(e.active.id as string);

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        setActiveId(null);
        if (!over) return;

        const overId = over.id as string;
        const item = [...pool, ...slots.mobile, ...slots.laptop].find((i) => i?.id === active.id);
        if (!item) return;

        setSlots((prev) => {
            const newSlots = {
                mobile: prev.mobile.map(i => i?.id === active.id ? null : i),
                laptop: prev.laptop.map(i => i?.id === active.id ? null : i)
            };
            let newPool = pool.filter(i => i.id !== active.id);

            if (overId === 'pool') {
                setPool([...newPool, item]);
                return newSlots;
            }

            const [type, indexStr] = overId.split('-');
            const index = parseInt(indexStr);
            const targetArray = type === 'mobile' ? newSlots.mobile : newSlots.laptop;

            if (targetArray[index] === null) {
                targetArray[index] = item;
                setPool(newPool);
            } else {
                setPool([...newPool, item]);
            }
            return newSlots;
        });
    };

    const checkResults = () => {
        const checkRow = (current: (TechItem | null)[], required: string[]) => {
            const currentLabels = current.map(i => i?.label).filter(Boolean).sort();
            const targetLabels = [...required].sort();
            return JSON.stringify(currentLabels) === JSON.stringify(targetLabels);
        };
        if (checkRow(slots.mobile, CORRECT_MAPPING.mobile) && checkRow(slots.laptop, CORRECT_MAPPING.laptop)) {
            onSaveScore?.(100);
            alert('Отлично!');
        } else {
            alert('Есть ошибки.');
        }
    };

    return (
        <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ height: `${600 * scale}px` }}>
                <div style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${BASE_WIDTH}px`,
                }}>
                    <DndContext 
                        sensors={sensors} 
                        onDragStart={handleDragStart} 
                        onDragEnd={handleDragEnd}
                        collisionDetection={pointerWithin} 
                    >
                        <div style={gameWrapperStyle}>
                            <div style={headerStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Типы подключения</h2>
                                    <span style={{ fontSize: '2rem' }}>🎮</span>
                                </div>
                                <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>Сопоставьте технологии подключения к интернету с устройствами</p>
                            </div>

                            <div style={rowsContainerStyle}>
                                <DeviceRow label="Мобильный телефон" type="mobile" items={slots.mobile} />
                                <DeviceRow label="Ноутбук" type="laptop" items={slots.laptop} />
                            </div>

                            <div style={{ height: '2px', background: 'rgba(255,255,255,0.2)', margin: '30px 0' }} />

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <TechPool items={pool} />
                                <button onClick={checkResults} style={checkButtonStyle}>проверить</button>
                            </div>

                            <DragOverlay modifiers={[snapCenterToCursor, translateScaleModifier]}>
                                {activeId ? (
                                    <div style={{ cursor: 'grabbing', zIndex: 9999 }}>
                                        <TechBadge label={INITIAL_TECH.find(i => i.id === activeId)?.label || ''} isDragging />
                                    </div>
                                ) : null}
                            </DragOverlay>
                        </div>
                    </DndContext>
                </div>
            </div>
        </div>
    );
};


const DeviceRow = ({ label, type, items }: { label: string; type: string; items: (TechItem | null)[] }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
        <div style={deviceLabelStyle}>{label}</div>
        {items.map((item, i) => (
            <Slot key={i} id={`${type}-${i}`} item={item} />
        ))}
    </div>
);

const Slot = ({ id, item }: { id: string; item: TechItem | null }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div ref={setNodeRef} style={{ ...slotStyle, backgroundColor: isOver ? 'rgba(255,255,255,0.5)' : 'white' }}>
            {item && <DraggableTech item={item} />}
        </div>
    );
};

const TechPool = ({ items }: { items: TechItem[] }) => {
    const { setNodeRef } = useDroppable({ id: 'pool' });
    return (
        <div ref={setNodeRef} style={poolStyle}>
            {items.map(item => <DraggableTech key={item.id} item={item} />)}
        </div>
    );
};

const DraggableTech = ({ item }: { item: TechItem }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });
    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0 : 1, 
        cursor: 'grab',
        touchAction: 'none'
    };
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <TechBadge label={item.label} />
        </div>
    );
};

const TechBadge = ({ label, isDragging }: { label: string; isDragging?: boolean }) => (
    <div style={{
        ...techBadgeStyle,
        boxShadow: isDragging ? '0 8px 20px rgba(0,0,0,0.2)' : 'none',
        cursor: isDragging ? 'grabbing' : 'grab'
    }}>
        {label}
    </div>
);

const rowsContainerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
const gameWrapperStyle: React.CSSProperties = { 
    backgroundColor: '#eef2f6', // Мягкий фон
    padding: '40px', 
    borderRadius: '32px', 
    color: '#2d3748', 
    fontFamily: '"Inter", sans-serif',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
};

const headerStyle: React.CSSProperties = { 
    backgroundColor: '#8b5cf6', // Фиолетовый градиентный тон
    padding: '30px', 
    borderRadius: '24px', 
    marginBottom: '40px', 
    color: 'white' 
};

const deviceLabelStyle: React.CSSProperties = { 
    backgroundColor: '#ffffff', 
    color: '#4a5568', 
    padding: '12px 20px', 
    borderRadius: '16px', 
    fontWeight: 700, 
    width: '180px', 
    textAlign: 'center',
    border: '2px solid #e2e8f0'
};

const slotStyle: React.CSSProperties = { 
    width: '110px', 
    height: '50px', 
    borderRadius: '16px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    transition: 'all 0.3s ease',
    border: '2px dashed #cbd5e1' // Пунктирная граница для зон
};

const techBadgeStyle: React.CSSProperties = { 
    backgroundColor: '#ffffff', 
    color: '#553c9a', 
    padding: '8px 16px', 
    borderRadius: '12px', 
    fontWeight: 600, 
    fontSize: '0.9rem', 
    border: '1px solid #d6bcfa',
    userSelect: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};

const poolStyle: React.CSSProperties = { 
    flex: 1, 
    backgroundColor: 'white', 
    padding: '20px', 
    borderRadius: '20px', 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '12px', 
    minHeight: '80px',
    border: '1px solid #edf2f7'
};

const checkButtonStyle: React.CSSProperties = { 
    backgroundColor: '#10b981', // Мятно-зеленый
    color: 'white', 
    border: 'none', 
    padding: '15px 40px', 
    borderRadius: '16px', 
    fontSize: '1.2rem', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    transition: 'transform 0.2s'
};