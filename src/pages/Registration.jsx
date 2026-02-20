import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../data/events';
import '../styles/registration.css';

export default function Registration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find(e => e.id === parseInt(id));

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    eventName: event?.title || ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      setShowSuccess(true);
      
      // Simulate form submission
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 3000);
    }
  };

  if (!event) {
    return (
      <div className="registration-not-found">
        <h2>Event not found</h2>
        <button onClick={() => navigate('/')}>Back to Events</button>
      </div>
    );
  }

  return (
    <div className="registration">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="container registration-container">
        <div className="registration-form-section">
          <div className="form-header">
            <h1>Register for Event</h1>
            <p>Complete the form below to register</p>
          </div>

          {showSuccess && (
            <div className="success-popup">
              <div className="success-content">
                <span className="success-icon">✅</span>
                <h2>Registration Successful!</h2>
                <p>You've been registered for {event.title}</p>
                <p className="success-subtext">A confirmation email will be sent to {formData.email}</p>
              </div>
            </div>
          )}

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                disabled
                readOnly
              />
              <small>Auto-filled</small>
            </div>

            <button type="submit" className="submit-btn">
              Complete Registration
            </button>
          </form>
        </div>

        <div className="registration-summary">
          <h2>Event Summary</h2>
          <div className="summary-card">
            <img src={event.image} alt={event.title} />
            <div className="summary-details">
              <h3>{event.title}</h3>
              <p className="summary-category">{event.category}</p>
              
              <div className="summary-info">
                <p><strong>📅 Date:</strong> {event.date}</p>
                <p><strong>🕐 Time:</strong> {event.time}</p>
                <p><strong>📍 Location:</strong> {event.location}</p>
              </div>

              <div className="summary-stats">
                <span className="stat-item">👥 {event.registeredCount} registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
