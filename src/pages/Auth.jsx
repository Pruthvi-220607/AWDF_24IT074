import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, setToken } from '../api';

/**
 * Auth Page — Practical 7: JWT Authentication
 *
 * Combines Login and Register into one page with a tab toggle.
 * On successful login → stores JWT in localStorage → redirects to /tasks.
 * On successful register → automatically logs in the user.
 */
function Auth() {
  const navigate = useNavigate();
  const [mode, setMode]       = useState('login');   // 'login' | 'register'
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(null);

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isLogin) {
        // ── LOGIN ─────────────────────────────────────────────────────────
        const { token } = await loginUser(email, password);
        setToken(token);                    // persist JWT in localStorage
        navigate('/tasks');                 // redirect to protected page
      } else {
        // ── REGISTER ──────────────────────────────────────────────────────
        await registerUser(email, password);
        setSuccess('Account created! Logging you in…');

        // Auto-login after register
        const { token } = await loginUser(email, password);
        setToken(token);
        setTimeout(() => navigate('/tasks'), 800);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section" aria-label="Authentication">
      <div className="auth-card card">
        {/* Logo / heading */}
        <div className="auth-logo">🔐</div>
        <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="auth-subtitle">
          {isLogin
            ? 'Sign in to manage your tasks'
            : 'Register to start managing tasks'}
        </p>

        {/* Tab toggle */}
        <div className="auth-tabs" role="tablist">
          <button
            id="tab-login"
            role="tab"
            aria-selected={isLogin}
            className={`auth-tab ${isLogin ? 'auth-tab--active' : ''}`}
            onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
          >
            Login
          </button>
          <button
            id="tab-register"
            role="tab"
            aria-selected={!isLogin}
            className={`auth-tab ${!isLogin ? 'auth-tab--active' : ''}`}
            onClick={() => { setMode('register'); setError(null); setSuccess(null); }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              className="form-input"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="form-error" role="alert">⚠️ {error}</p>
          )}

          {/* Success */}
          {success && (
            <p className="auth-success" role="status">✅ {success}</p>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading
              ? isLogin ? 'Signing in…' : 'Creating account…'
              : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Switch mode link */}
        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            id="auth-switch-btn"
            className="auth-switch-btn"
            onClick={() => { setMode(isLogin ? 'register' : 'login'); setError(null); }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
