import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🎉 EventHub</h1>
        </div>
        
        <button 
          className="hamburger" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</a>
             
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
