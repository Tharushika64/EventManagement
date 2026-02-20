import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      // Simulate login
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        isLoggedIn: true
      }));
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-form-container">
          <div className="auth-header">
            <h1>🎉 Welcome Back</h1>
            <p>Login to discover amazing events</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-submit-btn">
              Login
            </button>
          </form>

          <div className="auth-divider">
            <span>Don't have an account?</span>
          </div>

          <Link to="/signup" className="auth-link-btn">
            Create Account →
          </Link>

          <div className="auth-footer">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <div className="auth-image">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop"
            alt="Login"
          />
          <div className="auth-image-overlay">
            <h2>EventHub</h2>
            <p>Your gateway to amazing events</p>
          </div>
        </div>
      </div>
    </div>
  );
}
