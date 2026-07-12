function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>📬 Contact: <a href="mailto:student@college.edu" className="footer-link">student@college.edu</a></p>
      <p className="footer-copy">© {year} Student Portfolio. Built with React + Vite. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
