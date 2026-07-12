function Header({ name, themeColor }) {
  return (
    <header style={{ backgroundColor: themeColor || '#1a1a2e' }}>
      <div className="header-content">
        <h1 className="header-title">🎓 {name}'s Portfolio</h1>
        <p className="header-subtitle">React Developer | Creative Thinker | Problem Solver</p>
      </div>
    </header>
  );
}

export default Header;
