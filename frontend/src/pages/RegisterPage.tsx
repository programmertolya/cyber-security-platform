import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error: any) {
      alert(`Ошибка: ${error.response?.data?.message || 'Что-то пошло не так'}`);
    }
  };

  return (
    <div style={authPageWrapper}>
      <div 
        onClick={() => navigate('/')} 
        style={backToHomeStyle}
      >
        ← На главную
      </div>

      <div style={glassCardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={titleStyle}>Регистрация</h2>
          <div style={subTitleStyle}>Создайте новый аккаунт</div>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            style={glassInputStyle}
            placeholder="Имя пользователя"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="email"
            style={glassInputStyle}
            placeholder="Электронная почта"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            style={glassInputStyle}
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          <button type="submit" style={primaryButtonStyle}>
            Зарегистрироваться
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span style={footerTextStyle}>
            Уже есть аккаунт?{' '}
            <span onClick={() => navigate('/login')} style={linkStyle}>
              Войти
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Стили (Идентичны LoginPage для консистентности) ---

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
  boxShadow: '0 20px 60px rgba(107, 70, 193, 0.08)',
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
  color: '#4a5568',
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
  boxShadow: '0 10px 20px rgba(139, 92, 246, 0.2)',
  cursor: 'pointer',
};

const footerTextStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#718096',
};

const linkStyle: React.CSSProperties = {
  color: '#8b5cf6',
  fontWeight: 600,
  cursor: 'pointer',
  marginLeft: '4px',
};

export default RegisterPage;