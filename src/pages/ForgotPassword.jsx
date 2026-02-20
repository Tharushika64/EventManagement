import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      // Simulate sending reset email
      setTimeout(() => {
        setSubmitted(true);
        setIsLoading(false);
        // Store email for verification
        localStorage.setItem('resetEmail', email);
      }, 1500);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container forgot-password-container">
      <div className="colorful-bg-elements">
        <div className="color-blob blob-1"></div>
        <div className="color-blob blob-2"></div>
        <div className="color-blob blob-3"></div>
      </div>
      
      <div className="auth-wrapper">
        <div className="auth-form-container forgot-password-form">
          {!submitted ? (
            <>
              <div className="auth-header forgot-header">
                <div className="header-icon">🔐</div>
                <h1>Forgot Password?</h1>
                <p>Don't worry! We'll help you regain access to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="email-input-wrapper">
                    <span className="email-icon">✉️</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={errors.email ? 'error' : ''}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="auth-button forgot-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <span className="button-arrow">→</span>
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer forgot-footer">
                <p>
                  Remember your password?{' '}
                  <Link to="/login">Back to Login</Link>
                </p>
              </div>
            </>
          ) : (
            <div className="success-container">
              <div className="success-icon-animated">
                <div className="success-circle">✓</div>
              </div>
              <h2>Email Sent!</h2>
              <p className="success-subtitle">
                We've sent a password reset link to
              </p>
              <p className="success-email">{email}</p>
              <p className="success-message">
                Please check your email and click the link to reset your password.
                <br />If you don't see the email, check your spam folder.
              </p>
              <button
                type="button"
                className="auth-button forgot-button success-button"
                onClick={handleBackToLogin}
              >
                Back to Login
              </button>
              <button
                type="button"
                className="auth-button-secondary"
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
              >
                Try Another Email
              </button>
            </div>
          )}
        </div>

        <div className="auth-illustration forgot-illustration">
          <div className="illustration-content">
            <div className="illustration-icon">🔑</div>
            <h2>Secure Password Reset</h2>
            <p>Follow these simple steps to regain access to your account in seconds.</p>
            <ul className="steps-list">
              <li><span className="step-number">1</span>Enter your registered email</li>
              <li><span className="step-number">2</span>Check your email</li>
              <li><span className="step-number">3</span>Create new password</li>
              <li><span className="step-number">4</span>Login & enjoy!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
