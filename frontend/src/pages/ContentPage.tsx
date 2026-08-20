import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import apiClient from '../api/apiClient';
import type { TopicData, LeaderboardEntry } from '../types';
import { gameRegistry } from '../components/gameRegistry';
import AiHintBox from '../components/AiHintBox';
import { getLeaderboard } from '../api/gameService';

const ContentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { hash } = useLocation();
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  const gameSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/topics/${slug}`);
        setTopicData(response.data);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [slug]);

  const fetchLeaderboard = async (gameKey: string) => {
    try {
      const data = await getLeaderboard(gameKey);
      setLeaderboard(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Ошибка загрузки", e);
      setLeaderboard([]);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    if (topicData?.gameRegistryKey) {
      setLoadingLeaderboard(true);
      fetchLeaderboard(topicData.gameRegistryKey);
    }
  }, [topicData?.gameRegistryKey]);

  useEffect(() => {
    if (!loading && hash === '#game' && gameSectionRef.current) {
      requestAnimationFrame(() => {
        gameSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [loading, hash]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;
  if (error) return <h2 className="text-center text-danger mt-5">{error}</h2>;
  if (!topicData) return null;

  const gameKey = topicData.gameRegistryKey?.toLowerCase() || '';
  const GameComponent = gameKey ? gameRegistry[gameKey] : null;
  const aiContext = `Тема: ${topicData.title}. Описание: ${topicData.description}.`;

  return (
    <div className="container-fluid py-5 px-4" style={{ maxWidth: '1000px', background: 'transparent' }}>

      <h1 className="fw-bold mb-2 text-center" style={{ color: '#1a202c', letterSpacing: '-0.02em' }}>
        {topicData.title}
      </h1>

      <div className="text-center mb-5 mx-auto" style={{ maxWidth: '600px' }}>
        <p style={epigraphStyle}>
          {topicData.description}
        </p>
      </div>

      <div className="content-blocks my-5">
        {topicData.contentBlocks.map((block) => {
          if (block.type === 'text') {
            return (
              <div key={block.id} style={factBoxStyle} className="mb-4">
                <div style={factLabelStyle}>ФАКТ</div>
                <p className="mb-0" style={{ lineHeight: '1.6', color: '#2d3748' }}>{block.value}</p>
              </div>
            );
          }
          if (block.type === 'image') {
            return (
              <div key={block.id} className="text-center my-5">
                <img
                  src={block.value}
                  alt="Content"
                  className="img-fluid shadow-lg"
                  style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.3)' }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div ref={gameSectionRef} style={glassContainerStyle} className="mb-5">
        <div className="text-center mb-4">
          <h2 className="h4 fw-bold" style={{ color: '#4a5568' }}>Практический модуль</h2>
        </div>

        {GameComponent ? (
          <div style={innerGameStyle}>
            <GameComponent
              onSaveScore={async (score: number) => {
                try {
                  await apiClient.post('/games/score', { gameName: gameKey, score });
                  await fetchLeaderboard(gameKey);
                } catch (e) {
                  console.error("Ошибка сохранения", e);
                }
              }}
            />
          </div>
        ) : (
          <div className="text-center p-4 text-muted border rounded-4">Модуль в разработке</div>
        )}

        <div className="mt-5">
          <div style={tableHeaderStyle}>РЕЙТИНГ</div>
          <div className="table-responsive">
            {loadingLeaderboard ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" />
                <p className="mt-2 text-muted">Загрузка рейтинга...</p>
              </div>
            ) : (
              <table className="table table-borderless align-middle mb-0" style={{ color: '#4a5568' }}>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td className="fw-bold" style={{ width: '40px', opacity: 0.5 }}>{index + 1}</td>
                      <td>{entry.username}</td>
                      <td className="text-end fw-bold">{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>)}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5 pt-4">
        <div style={aiSearchContainerStyle}>
          <AiHintBox gameContext={aiContext} />
        </div>
      </div>

    </div>
  );
};


const glassContainerStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  borderRadius: '32px',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
  padding: '40px',
};

const aiSearchContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '700px',
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(15px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
  padding: '8px',
};

const epigraphStyle: React.CSSProperties = {
  fontStyle: 'italic',
  fontSize: '1.1rem',
  color: '#718096',
  position: 'relative',
  padding: '0 20px',
  display: 'inline-block',
  borderLeft: '2px solid rgba(107, 70, 193, 0.3)',
};

const factBoxStyle: React.CSSProperties = {
  background: 'rgba(107, 70, 193, 0.03)',
  padding: '24px',
  borderRadius: '20px',
  borderLeft: '4px solid #6b46c1',
};

const factLabelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 800,
  letterSpacing: '0.1em',
  color: '#6b46c1',
  marginBottom: '8px',
};

const tableHeaderStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: '#a0aec0',
  marginBottom: '16px',
  textAlign: 'center',
};

const innerGameStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  padding: '20px',
  border: '1px solid rgba(255, 255, 255, 0.5)',
};

export default ContentPage;