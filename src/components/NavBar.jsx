import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ isLightMode, toggleTheme }) {
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
        <li>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </li>
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
