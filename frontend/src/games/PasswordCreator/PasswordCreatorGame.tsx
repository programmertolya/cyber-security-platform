import React, { useState, useEffect } from 'react';

interface Rule { id: string; label: string; check: (p: string) => boolean; }

export const PasswordCreatorGame: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [stats, setStats] = useState({ time: '', label: '', color: '#a34848', percent: 0 });

    const rules: Rule[] = [
        { id: 'len', label: 'Не менее 8 символов', check: (p) => p.length >= 8 },
        { id: 'case', label: 'Буквы обоих регистров (Aa)', check: (p) => /[a-zа-яё]/.test(p) && /[A-ZА-ЯЁ]/.test(p) },
        { id: 'num', label: 'Наличие цифр', check: (p) => /[0-9]/.test(p) },
        { id: 'spec', label: 'Спецсимволы', check: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p) },
    ];

    const getGradientColor = (percent: number) => {
        const r = percent < 50 ? 255 : Math.floor(255 - (percent - 50) * 5.1);
        const g = percent > 50 ? 255 : Math.floor(percent * 5.1);
        return `rgb(${r}, ${g}, 72)`;
    };

    useEffect(() => {
        const metCount = rules.filter(r => r.check(password)).length;
        const percent = Math.min((metCount / rules.length) * 100, 100);

        const combinations = Math.pow(120, password.length);
        const totalSeconds = password.length > 0 ? combinations / 220_000_000_000 : 0;

        let timeStr = 'Мгновенно';
        let label = 'Очень слабый';

        if (password.length > 0) {
            if (totalSeconds < 60) timeStr = `${Math.floor(totalSeconds)} сек`;
            else if (totalSeconds < 3600) timeStr = `${Math.floor(totalSeconds / 60)} мин`;
            else if (totalSeconds < 86400) timeStr = `${Math.floor(totalSeconds / 3600)} ч`;
            else if (totalSeconds < 2592000) timeStr = `${Math.floor(totalSeconds / 86400)} дн`;
            else if (totalSeconds < 31104000) timeStr = `${Math.floor(totalSeconds / 2592000)} мес`;
            else if (totalSeconds < 3153600000) timeStr = `${Math.floor(totalSeconds / 31536000)} лет`;
            else timeStr = '> 100 лет';
        }

        if (percent === 100 && password.length > 12) label = 'Максимальный';
        else if (percent >= 75) label = 'Надежный';
        else if (percent >= 50) label = 'Средний';
        else if (percent >= 25) label = 'Слабый';

        setStats({ time: timeStr, label, color: getGradientColor(percent), percent });
    }, [password]);

    return (
        <div style={gameWrapperStyle}>
            <div style={matrixBgStyle} />
            <div style={{ position: 'relative', zIndex: 1, paddingBottom: '10px' }}>
                <h2 style={titleStyle}>SYSTEM_SECURITY_CHECK</h2>

                <div style={{
                    marginBottom: '20px',
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                    lineHeight: '1.4',
                    color: '#a0ffa0'
                }}>
                    <p>Вам требуется создать качественный пароль. Система оценивает надежность в реальном времени.</p>
                    <p style={{ color: '#888' }}>
                        Советы по созданию:<br />
                        • Фразы-ассоциации (например: <i>"MyCat12-Love!"</i>)<br />
                        • Избегайте личных данных.<br />
                        • Регистры и спецсимволы.
                    </p>
                </div>

                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль..."
                    style={inputStyle}
                />
                <div style={progressContainerStyle}>
                    <div style={{ ...progressBarStyle, width: `${stats.percent}%`, backgroundColor: stats.color }} />
                </div>
                <div style={resultBoxStyle}>
                    <div style={{ color: stats.color }}>Уровень: {stats.label}</div>
                    <div>Время взлома: <strong>{stats.time}</strong></div>
                </div>
                <div style={rulesContainerStyle}>
                    {rules.map((rule) => (
                        <div key={rule.id} style={{ color: rule.check(password) ? '#5dd15d' : '#888' }}>
                            {rule.check(password) ? '[✔]' : '[✘]'} {rule.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const gameWrapperStyle: React.CSSProperties = {
    backgroundColor: '#050505',
    padding: '20px', 
    borderRadius: '16px',
    color: '#5dd15d',
    fontFamily: 'monospace',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #3a6e3a',
    maxWidth: '500px', 
    margin: '0 auto',  
    width: '90%'       
};

const matrixBgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.15, 
    backgroundImage: 'repeating-linear-gradient(transparent, transparent 12px, #2bff2b 15px, #aaffaa 16px), repeating-linear-gradient(90deg, transparent, transparent 12px, #558855 15px, #5dd15d 16px)',
    pointerEvents: 'none',
    zIndex: 0
};

const titleStyle: React.CSSProperties = {
    color: '#5dd15d', 
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '1.2rem',
    margin: '0 0 20px 0'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0a0a0a',
    border: '1px solid #5dd15d',
    color: '#5dd15d',
    fontSize: '1rem', 
    borderRadius: '4px',
    boxSizing: 'border-box', 
    marginBottom: '20px',
    outline: 'none',
    WebkitAppearance: 'none' 
};

const progressContainerStyle: React.CSSProperties = {
    height: '8px',
    backgroundColor: '#1a1a1a', 
    marginBottom: '20px',
    border: '1px solid #5dd15d'
};

const progressBarStyle: React.CSSProperties = {
    height: '100%',
    transition: 'width 0.3s ease, background-color 0.3s ease'
};

const resultBoxStyle: React.CSSProperties = {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #5dd15d',
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#5dd15d'
};

const rulesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#bbb'
};