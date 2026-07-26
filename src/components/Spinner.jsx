import React from 'react';

/**
 * Spinner Component
 * Displays an animated loading indicator while data is being fetched.
 */
function Spinner() {
  return (
    <div className="spinner-wrapper" role="status" aria-label="Loading repositories">
      <div className="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="spinner-text">Fetching GitHub Repositories…</p>
    </div>
  );
}

export default Spinner;
