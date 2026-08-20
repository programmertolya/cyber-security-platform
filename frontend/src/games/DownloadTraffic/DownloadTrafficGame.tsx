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
  pointerWithin,
  type Modifier,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { snapCenterToCursor } from '@dnd-kit/modifiers';

// --- Данные ---
const FILES = [
  { id: 'f1', name: 'Музыкальная композиция', size: '10МБ' },
  { id: 'f2', name: 'Короткий ролик в хорошем качестве', size: '700МБ' },
  { id: 'f3', name: 'Дистрибутив Linux', size: '4ГБ' },
];

const SPEEDS = [
  { id: 's1', label: '128 кбит/с' },
  { id: 's2', label: '512 кбит/с' },
  { id: 's3', label: '2 мбит/с' },
];

const INITIAL_OPTIONS = [
  { id: 't1', label: '17-20 ч' }, { id: 't2', label: '10-15 мин' },
  { id: 't3', label: '< 1 ч' }, { id: 't4', label: '80-90 мин' },
  { id: 't5', label: '3-4 ч' }, { id: 't6', label: '< 1 мин' },
  { id: 't7', label: '12-15 ч' }, { id: 't8', label: '2-3 дня' },
  { id: 't9', label: '5-7 мин' }, { id: 't10', label: '40-50 сек' },
];

const CORRECT_ANSWERS: Record<string, string> = {
  'f1-s1': '10-15 мин', 'f1-s2': '< 1 ч', 'f1-s3': '< 1 мин',
  'f2-s1': '12-15 ч', 'f2-s2': '3-4 ч', 'f2-s3': '80-90 мин',
  'f3-s2': '17-20 ч',
};

export const DownloadTrafficGame: React.FC = () => {
  const [pool, setPool] = useState(INITIAL_OPTIONS);
  const [slots, setSlots] = useState<Record<string, (typeof INITIAL_OPTIONS)[0] | null>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [tableHeight, setTableHeight] = useState(0);

  const tableRef = useRef<HTMLDivElement>(null);
  const BASE_WIDTH = 950;

  useEffect(() => {
    const updateLayout = () => {
      const parentWidth = window.innerWidth;
      const newScale = Math.min((parentWidth - 40) / BASE_WIDTH, 1);
      setScale(newScale);
      if (tableRef.current) setTableHeight(tableRef.current.offsetHeight);
    };
    window.addEventListener('resize', updateLayout);
    updateLayout();
    setTimeout(updateLayout, 150);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Исправленный модификатор координат для DragOverlay
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

    const activeOption = [...pool, ...Object.values(slots)].find(o => o?.id === active.id);
    if (!activeOption) return;

    const overId = over.id as string;
    if (overId === 'pool') {
      setSlots(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => { if (next[k]?.id === activeOption.id) next[k] = null; });
        return next;
      });
      if (!pool.find(o => o.id === activeOption.id)) setPool(p => [...p, activeOption]);
    } else {
      setSlots(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => { if (next[k]?.id === activeOption.id) next[k] = null; });
        const existing = next[overId];
        if (existing) setPool(p => [...p, existing]);
        next[overId] = activeOption;
        setPool(p => p.filter(i => i.id !== activeOption.id));
        return next;
      });
    }
  };

  const checkResults = () => {
    let correct = 0;
    Object.entries(CORRECT_ANSWERS).forEach(([id, val]) => { if (slots[id]?.label === val) correct++; });
    alert(correct === Object.keys(CORRECT_ANSWERS).length ? "Отлично!" : `Верно: ${correct}/${Object.keys(CORRECT_ANSWERS).length}`);
  };

  return (
    <div style={pageWrapper}>
      {/* Контейнер-ограничитель для Flex-центрации */}
      <div style={{ width: `${BASE_WIDTH * scale}px` }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: BASE_WIDTH
        }}>
          <DndContext 
            sensors={sensors} 
            onDragStart={handleDragStart} 
            onDragEnd={handleDragEnd} 
            collisionDetection={pointerWithin}
          >
            <div style={gameHeader}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800 }}>Скорость скачивания</h1>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.9 }}>Рассчитайте время скачивания файла</p>
                </div>
                <div style={{ fontSize: '32px' }}>🎮</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '25px', alignItems: 'flex-start' }}>
              <div ref={tableRef} style={tableArea}>
                <div style={grid}>
                  <div style={cornerCell}>Размер файла / скор.</div>
                  {SPEEDS.map(s => <div key={s.id} style={headerCell}>{s.label}</div>)}
                  {FILES.map(file => (
                    <React.Fragment key={file.id}>
                      <div style={labelCell}>
                        <span style={{ fontSize: '12px' }}>{file.name}</span>
                        <b style={{ fontSize: '15px' }}>{file.size}</b>
                      </div>
                      {SPEEDS.map(speed => (
                        <DropSlot key={`${file.id}-${speed.id}`} id={`${file.id}-${speed.id}`} item={slots[`${file.id}-${speed.id}`]} />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div style={sidebar}>
                <div style={{ ...poolWrapper, height: `${tableHeight}px` }}>
                  <DroppablePool id="pool">
                    {pool.map(opt => <DraggableItem key={opt.id} item={opt} />)}
                  </DroppablePool>
                </div>
                <button onClick={checkResults} style={checkButton}>ПРОВЕРИТЬ</button>
              </div>
            </div>

            {/* ВАЖНО: DragOverlay должен находиться ВНУТРИ масштабируемого div, 
                но мы применяем модификатор snapCenterToCursor и пересчет координат */}
            <DragOverlay modifiers={[snapCenterToCursor, translateScaleModifier]}>
              {activeId ? (
                <div style={{ transform: `scale(${1})`, transformOrigin: 'center' }}>
                  <ItemBadge label={[...pool, ...Object.values(slots)].find(o => o?.id === activeId)?.label || ''} dragging />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

// --- Компоненты ---

const DropSlot = ({ id, item }: { id: string; item: any }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} style={{ ...slotStyle, backgroundColor: isOver ? '#ffb347' : '#f38d15' }}>
      {item && <DraggableItem item={item} />}
    </div>
  );
};

const DroppablePool = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef} style={poolStyle}>{children}</div>;
};

const DraggableItem = ({ item }: { item: any }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });
  const style = { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0 : 1, cursor: 'grab', width: '100%' };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ItemBadge label={item.label} />
    </div>
  );
};

const ItemBadge = ({ label, dragging }: { label: string; dragging?: boolean }) => (
  <div style={{
    backgroundColor: '#ff9000', color: '#000', padding: '10px', borderRadius: '6px', fontWeight: 'bold',
    textAlign: 'center', width: dragging ? '140px' : '100%', boxSizing: 'border-box',
    boxShadow: dragging ? '0 8px 20px rgba(0,0,0,0.4)' : 'none', border: '1px solid rgba(0,0,0,0.1)'
  }}>{label}</div>
);

const pageWrapper: React.CSSProperties = { display: 'flex', justifyContent: 'center', paddingTop: '40px', minHeight: '100vh', backgroundColor: '#f8fafc' };

const gameHeader: React.CSSProperties = { 
  background: '#8b5cf6', // Сочный фиолетовый
  padding: '24px 30px', 
  borderRadius: '24px', 
  color: 'white',
  boxShadow: '0 10px 25px rgba(139, 92, 246, 0.2)'
};

const tableArea: React.CSSProperties = { 
  flex: 1, 
  background: '#ffffff', 
  borderRadius: '24px', 
  padding: '20px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
};

const grid: React.CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: '220px repeat(3, 1fr)', 
  gap: '8px', 
  background: 'transparent' 
};

const cornerCell: React.CSSProperties = { background: '#f1f5f9', color: '#64748b', padding: '15px', fontWeight: 'bold', fontSize: '13px', borderRadius: '12px' };
const headerCell: React.CSSProperties = { background: '#f1f5f9', color: '#475569', padding: '15px', textAlign: 'center', fontWeight: 'bold', borderRadius: '12px' };
const labelCell: React.CSSProperties = { background: '#f8fafc', color: '#1e293b', padding: '15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px' };

const slotStyle: React.CSSProperties = { 
  minHeight: '85px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  borderRadius: '16px',
  border: '2px dashed #e2e8f0',
  transition: 'all 0.3s ease'
};

const sidebar: React.CSSProperties = { width: '200px', display: 'flex', flexDirection: 'column', gap: '15px' };
const poolWrapper: React.CSSProperties = { background: '#ffffff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2e8f0', padding: '5px' };
const poolStyle: React.CSSProperties = { padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', overflowY: 'auto', alignItems: 'center' };

const checkButton: React.CSSProperties = { 
  background: '#10b981', 
  color: 'white', 
  border: 'none', 
  padding: '16px', 
  borderRadius: '16px', 
  fontWeight: 'bold', 
  cursor: 'pointer', 
  fontSize: '16px',
  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
};