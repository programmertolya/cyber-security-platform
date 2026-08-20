import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/Auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate(`/catalog`);
    } catch (error: any) {
      alert('Ошибка доступа');
    }
  };

  return (
    <div style={authPageWrapper}>
      <div 
        onClick={() => navigate('/')} 
        style={backToHomeStyle}
        title="На главную"
      >
        ← На главную
      </div>

      <div style={glassCardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={titleStyle}>Авторизация</h2>
          <div style={subTitleStyle}>АЗБУКА</div>
        </div>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input
            type="email"
            style={glassInputStyle}
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            style={glassInputStyle}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={primaryButtonStyle}>
            Войти
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button onClick={() => navigate('/register')} style={secondaryButtonStyle}>
            Нет аккаунта? Создать
          </button>
        </div>
      </div>
    </div>
  );
};


const authPageWrapper: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
  padding: '20px', 
  boxSizing: 'border-box',
};

const backToHomeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  cursor: 'pointer',
  color: '#8b5cf6',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: '0.2s',
};

const glassCardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '420px', 
  padding: '40px 30px',
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '32px',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  boxShadow: '0 20px 60px rgba(107, 70, 193, 0.1)',
  boxSizing: 'border-box',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(1.5rem, 5vw, 1.75rem)', 
  fontWeight: 700,
  color: '#2d3748',
  margin: 0,
};

const subTitleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: '#8b5cf6',
  fontWeight: 700,
  marginTop: '4px',
};

const glassInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px 20px',
  marginBottom: '16px',
  borderRadius: '16px',
  border: '1px solid rgba(139, 92, 246, 0.2)',
  background: 'rgba(255, 255, 255, 0.5)',
  outline: 'none',
  fontSize: '0.95rem',
  boxSizing: 'border-box', 
};

const primaryButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  borderRadius: '16px',
  border: 'none',
  background: '#8b5cf6',
  color: 'white',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 10px 20px rgba(139, 92, 246, 0.2)',
  transition: 'transform 0.2s ease',
};

const secondaryButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#7c3aed',
  fontSize: '0.9rem',
  fontWeight: 500,
  cursor: 'pointer',
};

export default LoginPage;