import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Tasks from './pages/Tasks';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { getToken, clearToken } from './api';

/**
 * ProtectedRoute — redirects to /auth if no JWT is stored.
 * This is a client-side guard; the server enforces auth too (defence-in-depth).
 */
function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/auth" replace />;
}

function App() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn]   = useState(!!getToken());

  const toggleTheme = () => setIsLightMode(!isLightMode);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    // Redirect handled by NavBar
  };

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', isLightMode);
  }, [isLightMode]);

  // Re-sync login state when token changes (e.g., after login in Auth page)
  useEffect(() => {
    const syncLogin = () => setIsLoggedIn(!!getToken());
    window.addEventListener('storage', syncLogin);
    return () => window.removeEventListener('storage', syncLogin);
  }, []);

  return (
    <div className="app-wrapper">
      <NavBar
        isLightMode={isLightMode}
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Header name="Pruthvi" />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
