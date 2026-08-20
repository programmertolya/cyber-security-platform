import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const CatalogPage = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<any[]>([]);
  const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");


  const sectionMapping = [
    {
      title: "Безопасность в сети Интернет",
      keywords: ["Конфиденциальность", "Пароль", "Безопасность"]
    },
    {
      title: "Сетевые сервисы",
      keywords: ["Интернет", "Сервисы"]
    },
    {
      title: "Устройство сети",
      keywords: ["Трафик", "Устройство", "Протокол"]
    },
    {
      title: "Сайты",
      keywords: ["Сайт"]
    },
    {
      title: "Теория информации",
      keywords: ["Расстояние Хэмминга"]
    }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiClient.get('/topics');
        setTopics(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке тем:", error);
      }
    }
    fetchData();
  }, []);

 
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getTopicsForSection = (keywords: string[]) => {
    return topics.filter(t =>
      keywords.some(k => t.title.toLowerCase().includes(k.toLowerCase()))
    );
  };


  return (
    <div className="container mt-4 mb-5">

      <div style={alphabetNavigationStyle}>
        {alphabet.map(letter => (
          <span
            key={letter}
            onClick={() => scrollToLetter(letter)}
            style={letterItemStyle}
          >
            {letter}
          </span>
        ))}
      </div>

      <h1 className="text-center mb-5 fw-bold" style={{ color: '#2d3748', letterSpacing: '-0.02em' }}>
        КАТАЛОГ МОДУЛЕЙ
      </h1>

      {sectionMapping.map((section, sIdx) => {
        const sectionTopics = getTopicsForSection(section.keywords);
        if (sectionTopics.length === 0) return null;

        return (
          <div key={sIdx} className="mb-5">
            <h2 style={sectionHeaderStyle}>{section.title}</h2>
            <div className="row g-4">
              {sectionTopics.map((topic) => (
                <div key={topic.id}
                  id={`letter-${topic.title[0].toUpperCase()}`}
                  className="col-md-4 col-sm-6"
                  style={topicColumnStyle}>
                  <div style={glassCardStyle}>
                    <div className="card-body p-4">
                      <div style={topicLabelStyle}>МОДУЛЬ</div>
                      <h5 className="fw-bold mb-4" style={{ color: '#2d3748' }}>{topic.title}</h5>

                      <div className="d-grid gap-2">
                        <Link to={`/topic/${topic.slug}`} className="text-decoration-none">
                          <button style={primaryButtonStyle}>Изучать</button>
                        </Link>
                        <button
                          style={secondaryButtonStyle}
                          onClick={() => navigate(`/topic/${topic.slug}#game`)}
                        >
                          Практика
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};


const topicColumnStyle: React.CSSProperties = {
  scrollMarginTop: '180px', 
};

const alphabetNavigationStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
  padding: '15px',
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  marginBottom: '40px',
  position: 'sticky',
  top: '110px', 
  zIndex: 900,
};

const letterItemStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#8b5cf6',
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  backgroundColor: 'rgba(139, 92, 246, 0.05)',
};

const sectionHeaderStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 800,
  letterSpacing: '0.15em',
  color: '#a0aec0',
  textTransform: 'uppercase',
  marginBottom: '24px',
  borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
  paddingBottom: '10px'
};

const glassCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(15px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 10px 30px rgba(107, 70, 193, 0.05)',
  height: '100%',
  transition: 'transform 0.3s ease',
};

const topicLabelStyle: React.CSSProperties = {
  fontSize: '0.6rem',
  fontWeight: 800,
  color: '#8b5cf6',
  letterSpacing: '0.1em',
  marginBottom: '8px'
};

const primaryButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  borderRadius: '12px',
  border: 'none',
  background: '#8b5cf6',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.9rem',
  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
};

const secondaryButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  borderRadius: '12px',
  border: '1px solid rgba(139, 92, 246, 0.3)',
  background: 'transparent',
  color: '#7c3aed',
  fontWeight: 600,
  fontSize: '0.9rem',
};

export default CatalogPage;