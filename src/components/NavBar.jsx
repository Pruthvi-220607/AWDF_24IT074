import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar({ isLightMode, toggleTheme, isLoggedIn, onLogout, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        🎓 Student Portfolio
      </NavLink>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className="nav-link">
            Projects
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/tasks" className="nav-link">
              Tasks
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </li>
        {/* Auth controls */}
        {isLoggedIn ? (
          <li>
            <button
              id="logout-btn"
              className="btn btn-secondary nav-auth-btn"
              onClick={handleLogout}
              aria-label="Logout"
            >
              🚪 Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/auth" className="nav-link nav-login-link" id="login-nav-btn">
              🔐 Login
            </NavLink>
          </li>
        )}
        <li>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle dark/light theme"
          >
            {isLightMode ? '🌙' : '☀️'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
