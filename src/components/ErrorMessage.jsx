import React from 'react';

/**
 * ErrorMessage Component
 * Displays a styled error panel with the error message and a retry button.
 *
 * Props:
 *   message  {string}   - The error message to display.
 *   onRetry  {function} - Callback invoked when the user clicks "Retry".
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-wrapper" role="alert" aria-live="assertive">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button
          id="retry-fetch-btn"
          className="retry-btn"
          onClick={onRetry}
          aria-label="Retry fetching repositories"
        >
          🔄 Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
