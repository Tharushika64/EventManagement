import { useState } from 'react';
import '../styles/aboutContact.css';

export default function AboutContact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!contactForm.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!contactForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!contactForm.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (contactForm.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="about-contact">
      <section className="about-section">
        <div className="container">
          <h1>About EventHub</h1>
          <div className="about-content">
            <div className="about-text">
              <h2>Your Gateway to Amazing Events</h2>
              <p>
                EventHub is a modern platform dedicated to bringing people together through 
                extraordinary experiences. Whether you're interested in learning new skills at 
                workshops, staying updated with the latest tech trends, or enjoying live music, 
                we've got something for everyone.
              </p>
              <p>
                Our mission is to make event discovery and registration simple, seamless, and enjoyable. 
                We curate the best events from around the world and provide you with all the information 
                you need to make the most of your experience.
              </p>
              <p>
                Join thousands of event enthusiasts who have discovered their next favorite experience 
                through EventHub. From intimate workshops to large-scale festivals, we're here to connect 
                you with moments that matter.
              </p>
            </div>

            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <h3>Curated Events</h3>
                <p>Hand-picked events tailored to your interests</p>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <h3>Easy Registration</h3>
                <p>Quick and simple event registration process</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🔔</span>
                <h3>Smart Notifications</h3>
                <p>Never miss important event updates</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🌍</span>
                <h3>Global Community</h3>
                <p>Connect with event enthusiasts worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h1>Get in Touch</h1>
          <p className="section-subtitle">Have questions or suggestions? We'd love to hear from you!</p>

          {showSuccess && (
            <div className="success-message">
              <span className="success-icon">✅</span>
              <p>Thank you! We've received your message and will get back to you soon.</p>
            </div>
          )}

          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <h3>Email</h3>
                  <p><a href="mailto:hello@eventhub.com">hello@eventhub.com</a></p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <h3>Address</h3>
                  <p>123 Event Street<br />Silicon Valley, CA 94025<br />United States</p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <h3>Phone</h3>
                  <p><a href="tel:+1-800-EVENT-HUB">+1 (800) 338-2482</a></p>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🕐</span>
                <div>
                  <h3>Hours</h3>
                  <p>Monday - Friday: 9 AM - 6 PM<br />Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="6"
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
