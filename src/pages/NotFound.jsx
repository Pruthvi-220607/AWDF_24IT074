import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-container card">
      <div className="notfound-code">404</div>
      <h2 className="notfound-title">Oops! Page Not Found</h2>
      <p className="notfound-desc">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="notfound-btn">Back to Home</Link>
    </div>
  );
}

export default NotFound;
