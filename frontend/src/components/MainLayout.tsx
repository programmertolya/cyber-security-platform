import { Outlet, Link, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', display: 'flex', flexDirection: 'column' }}>
      
      <nav style={headerStyle}>
        <div className="container d-flex justify-content-between align-items-center h-100">
          <Link style={logoStyle} to="/catalog">АЗБУКА</Link>
          <div className="d-flex align-items-center gap-4">
            <Link style={navLinkStyle} to="/catalog">Каталог</Link>
            <button onClick={handleLogout} style={logoutButtonStyle}>Выйти</button>
          </div>
        </div>
      </nav>

      <main style={{ flexGrow: 1, paddingTop: '100px', paddingBottom: '60px' }}>
        <Outlet />
      </main>

      <footer style={footerStyle}>
        <div style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '0.05em' }}>
          &copy; «Центр телекоммуникаций и информационных систем в образовании», 2026
        </div>
      </footer>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100% - 40px)',
  maxWidth: '1200px',
  height: '70px',
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(15px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
  zIndex: 1000,
};

const logoStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: '1.2rem',
  color: '#2d3748',
  textDecoration: 'none',
  letterSpacing: '0.1em',
};

const navLinkStyle: React.CSSProperties = {
  color: '#4a5568',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 600,
};

const logoutButtonStyle: React.CSSProperties = {
  background: 'rgba(139, 92, 246, 0.1)',
  color: '#7c3aed',
  border: 'none',
  padding: '8px 20px',
  borderRadius: '12px',
  fontSize: '0.85rem',
  fontWeight: 700,
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '40px 0',
  color: '#2d3748',
};

export default MainLayout;