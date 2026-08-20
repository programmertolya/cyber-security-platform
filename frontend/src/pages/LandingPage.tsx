import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div style={landingWrapperStyle}>
            <div style={bgGlowStyle}></div>

            <div style={contentContainerStyle}>
                <header style={headerSectionStyle}>
                    <h1 style={mainTitleStyle}>АЗБУКА</h1>
                    <p style={subtitleStyle}>Цифрового мира</p>
                </header>


                <div className="features-scroll-container" style={featuresScrollStyle}>
                    <div style={glassCardStyle}>
                        <div style={cardLabelStyle}>01. ОБУЧЕНИЕ</div>
                        <h3 style={cardTitleStyle}>Учись</h3>
                        <p style={cardTextStyle}>Погружение в теорию через современные интерактивные модули.</p>
                    </div>

                    <div style={glassCardStyle}>
                        <div style={cardLabelStyle}>02. ПРАКТИКА</div>
                        <h3 style={cardTitleStyle}>Играй</h3>
                        <p style={cardTextStyle}>Закрепляй знания в игре.                                    </p>
                    </div>

                    <div style={glassCardStyle}>
                        <div style={cardLabelStyle}>03. ДОСТИЖЕНИЯ</div>
                        <h3 style={cardTitleStyle}>Побеждай</h3>
                        <p style={cardTextStyle}>Отслеживай прогресс и занимай верхние строчки рейтинга.</p>
                    </div>
                </div>

                <div style={buttonGroupStyle}>
                    <Link to='/login' style={linkResetStyle}>
                        <button style={primaryButtonStyle}>Начать обучение</button>
                    </Link>
                    <Link to='/register' style={linkResetStyle}>
                        <button style={secondaryButtonStyle}>Регистрация</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};


const landingWrapperStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    position: 'relative',
    overflowX: 'hidden',
    padding: '40px 0',
    boxSizing: 'border-box'
};

const contentContainerStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const bgGlowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '40%', 
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(90vw, 600px)',
    height: 'min(90vw, 600px)',
    background: 'rgba(139, 92, 246, 0.12)',
    filter: 'blur(100px)',
    borderRadius: '50%',
    zIndex: 0
};

const headerSectionStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '0 20px',
    marginBottom: '50px',
};

const mainTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
    fontWeight: 900,
    color: '#1a202c',
    letterSpacing: '-0.03em',
    margin: 0,
};

const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 3vw, 1.15rem)',
    color: '#718096',
    maxWidth: '600px',
    margin: '16px auto 0 auto',
    lineHeight: '1.6',
};

const featuresScrollStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    overflowX: 'auto', 
    gap: '24px',
    padding: '20px 20px 60px 20px', 
    justifyContent: 'center', 
    boxSizing: 'border-box',
    WebkitOverflowScrolling: 'touch',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
};

const glassCardStyle: React.CSSProperties = {
    flex: '0 0 300px', 
    background: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '32px',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    padding: '40px 30px',
    textAlign: 'left',
    boxShadow: '0 15px 35px rgba(107, 70, 193, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

const cardLabelStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: 800,
    letterSpacing: '0.15em',
    color: '#8b5cf6',
    marginBottom: '20px'
};

const cardTitleStyle: React.CSSProperties = {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#2d3748',
    marginBottom: '12px'
};

const cardTextStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#4a5568',
    lineHeight: '1.5',
    margin: 0
};

const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    marginTop: '20px'
};

const linkResetStyle: React.CSSProperties = {
    textDecoration: 'none',
};

const primaryButtonStyle: React.CSSProperties = {
    padding: '18px 40px',
    borderRadius: '18px',
    border: 'none',
    background: '#8b5cf6',
    color: 'white',
    fontWeight: 700,
    fontSize: '1.05rem',
    cursor: 'pointer',
    boxShadow: '0 12px 30px rgba(139, 92, 246, 0.3)',
    transition: 'transform 0.2s ease',
};

const secondaryButtonStyle: React.CSSProperties = {
    padding: '18px 40px',
    borderRadius: '18px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    color: '#7c3aed',
    fontWeight: 700,
    fontSize: '1.05rem',
    cursor: 'pointer',
};

export default LandingPage;