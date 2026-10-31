import React from 'react';

/**
 * Toast Component — Practical 6 Supplementary
 *
 * Displays a brief success or error notification at the bottom-right
 * of the viewport. The parent controls visibility via conditional render +
 * a setTimeout to clear it after ~3 seconds.
 */
function Toast({ message, type = 'success' }) {
  return (
    <div
      className={`toast toast--${type}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

export default Toast;
