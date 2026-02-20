import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🎉 EventHub</h3>
          <p>Your platform for discovering and attending amazing events.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us 👇</h4>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook" className="social-icon facebook">
              <span>f</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter" className="social-icon twitter">
              <span>𝕏</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram" className="social-icon instagram">
              <span>📷</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="Join us on LinkedIn" className="social-icon linkedin">
              <span>in</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EventHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
