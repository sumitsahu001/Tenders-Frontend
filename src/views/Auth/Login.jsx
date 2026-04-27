/**
 * @file Login.jsx
 * @description Handles authentication and role-based redirect for the application.
 * Manages secure token storage and role synchronization.
 * - Sumit Sahu
 */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { showPopup } from '../../context/popupApi';

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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''} ${touched.email && !errors.email && email ? 'is-valid' : ''}`}
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
          />
          {touched.email && errors.email && (
            <div className="invalid-feedback d-block">
              {errors.email}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''} ${touched.password && !errors.password && password ? 'is-valid' : ''}`}
              id="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
            >
              <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
            </button>
            {touched.password && errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password}
              </div>
            )}
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Submit'}
        </button>
      </form>
    </>
  );
}

export default Login;
