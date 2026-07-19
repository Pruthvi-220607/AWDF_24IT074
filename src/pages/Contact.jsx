import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const charLimit = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
    }
  };

  const getCharCountClass = () => {
    const len = message.length;
    if (len > charLimit - 50) return 'char-count danger';
    if (len > charLimit - 100) return 'char-count warning';
    return 'char-count';
  };

  return (
    <section className="contact-section">
      <div className="card contact-container">
        <h2 className="section-title">📬 Contact Me</h2>
        
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--accent)', marginBottom: '12px' }}>🎉 Message Sent!</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Thank you, <strong>{name}</strong>! I have received your message and will get back to you at <strong>{email}</strong> shortly.
            </p>
            <button 
              className="submit-btn" 
              style={{ marginTop: '20px' }}
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Full Name</label>
              <input 
                id="contact-name"
                type="text" 
                className="form-input" 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Email Address</label>
              <input 
                id="contact-email"
                type="email" 
                className="form-input" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="contact-message" className="form-label">
                  Your Message
                  <span className="help-container">
                    <button 
                      type="button" 
                      className="help-btn" 
                      onClick={() => setShowHelp(!showHelp)}
                      aria-label="Toggle help message"
                    >
                      ❓
                    </button>
                    {showHelp && (
                      <span className="help-tooltip">
                        Please write a detailed message. You can describe your project idea, query, or job description. (Max 500 chars)
                      </span>
                    )}
                  </span>
                </label>
              </div>
              <textarea 
                id="contact-message"
                className="form-input" 
                placeholder="Type your message here..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value.slice(0, charLimit))} 
                maxLength={charLimit}
                required
              />
              <div className="form-footer">
                <span>Maximum {charLimit} characters allowed.</span>
                <span className={getCharCountClass()}>
                  {message.length} / {charLimit}
                </span>
              </div>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;
