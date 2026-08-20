import React, { useState } from "react";

const AiHintBox = ({ gameContext }: { gameContext: string }) => {
    const [question, setQuestion] = useState('');
    const [hint, setHint] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!question.trim()) return;
        setLoading(true);
        setHint('');
        const fullPrompt = `Контекст: ${gameContext}. Вопрос: ${question}`;
        try {
            const baseUrl = import.meta.env.VITE_API_URL || '/api';
            const response = await fetch(`${baseUrl}/Ai/hint`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fullPrompt),
            });
            if (!response.body) throw new Error('Error');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        accumulatedText += line.replace('data: ', '');
                        setHint(accumulatedText);
                    }
                }
            }
        } catch (error) {
            setHint('Ошибка связи с сервисом.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={aiContainerStyle}>
            <div style={searchBarStyle}>
                <input 
                    type="text"
                    placeholder="Задайте вопрос по теме..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={inputStyle}
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                />
                <button onClick={handleAsk} disabled={loading} style={sendButtonStyle}>
                    {loading ? <div className="spinner-border spinner-border-sm" /> : 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    }
                </button>
            </div>

            {hint && (
                <div style={answerAreaStyle}>
                    <div style={labelStyle}>ОТВЕТ АССИСТЕНТА</div>
                    <div style={{ lineHeight: '1.6', color: '#2d3748' }}>{hint}</div>
                </div>
            )}
        </div>
    );
};

// Styles
const aiContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '750px',
    margin: '0 auto',
};

const searchBarStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    padding: '10px 14px 10px 24px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(107, 70, 193, 0.1)',
};

const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '1.05rem',
    color: '#4a5568',
};

const sendButtonStyle: React.CSSProperties = {
    width: '42px',
    height: '42px',
    borderRadius: '16px',
    border: 'none',
    background: '#8b5cf6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
};

const answerAreaStyle: React.CSSProperties = {
    marginTop: '16px',
    background: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    animation: 'fadeIn 0.4s ease-out',
};

const labelStyle: React.CSSProperties = {
    fontSize: '0.65rem',
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: '#8b5cf6',
    marginBottom: '10px',
};

export default AiHintBox;