/**
 * @file Login.jsx
 * @description Handles authentication and role-based redirect for the application.
 * Manages secure token storage and role synchronization.
 * - Sumit Sahu
 */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { showPopup } from '../../context/popupApi';
import './Auth.css';

function Login({ setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const apiurl = process.env.REACT_APP_API_URL + '/api/auth/login';

  // Validation function
  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address';
      }
    }
    
    if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
    }
    
    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      email: validateField('email', email),
      password: validateField('password', password)
    };
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Handle field change
  const handleFieldChange = (name, value) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    
    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle field blur (when user leaves the field)
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const value = name === 'email' ? email : password;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    const loginDetails = { email, password };

    try {
      const response = await axios.post(apiurl, loginDetails, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Login response data:', response.data);

      // Save login info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('name', response.data.name);

      // Update App.js role state instantly so Header changes without refresh
      setRole(response.data.role);

      // Reset form
      setEmail('');
      setPassword('');
      setErrors({});
      setTouched({});

      // Redirect based on role
      const userRole = response.data.role;
      if (userRole === 'government') {
        navigate('/government');
      } else if (userRole === 'contractor') {
        navigate('/contractor');
      } else {
        navigate('/public-dashboard');
      }

      showPopup({
        message: response.data.message,
        variant: 'success',
        title: 'Logged in',
      });

    } catch (error) {
      if (error.response) {
        showPopup({
          message: error.response.data.message,
          variant: 'error',
          title: 'Login failed',
        });
      } else {
        console.error('Login error:', error);
        showPopup({
          message:
            'Network error. Please check your connection and try again.',
          variant: 'error',
          title: 'Connection problem',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - GovTenders Portal</title>
        <meta name="description" content="Login to your GovTenders account to apply for and track government tenders." />
      </Helmet>

      <div className="auth-container">
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your account to continue</p>
            </div>

            <div className="auth-card">
              <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="email">Email Address</label>
                  <div className="auth-input-wrapper">
                    <i className="bi bi-envelope auth-input-icon"></i>
                    <input
                      type="email"
                      className={`auth-input ${touched.email && errors.email ? 'is-invalid' : ''} ${touched.email && !errors.email && email ? 'is-valid' : ''}`}
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      required
                    />
                  </div>
                  {touched.email && errors.email && (
                    <div className="invalid-feedback d-block mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="auth-form-group">
                  <label className="auth-label" htmlFor="password">Password</label>
                  <div className="auth-input-wrapper">
                    <i className="bi bi-lock auth-input-icon"></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`auth-input ${touched.password && errors.password ? 'is-invalid' : ''} ${touched.password && !errors.password && password ? 'is-valid' : ''}`}
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      required
                    />
                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="invalid-feedback d-block mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Sign In'}
                </button>
              </form>

              <div className="auth-footer-text">
                Don't have an account? 
                <Link to="/register" className="auth-footer-link">Register</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-hero-side">
          <div className="auth-grid-overlay"></div>
          <div className="auth-blob auth-blob-1"></div>
          <div className="auth-blob auth-blob-2"></div>
          <div className="auth-blob auth-blob-3"></div>

          <div className="auth-hero-content">
            <div className="auth-badge-icon">
              <i className="bi bi-shield-lock"></i>
            </div>
            <h2 className="auth-hero-title">Secure Portal Access</h2>
            <p className="auth-hero-desc">
              Access the official GovTenders bidding and contracts hub. Our portal utilizes end-to-end data encryption and strict cryptographic standards to ensure a transparent, fair, and secure bidding environment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
