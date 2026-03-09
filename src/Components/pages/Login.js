import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Login({ setRole }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const apiurl = process.env.REACT_APP_API_URL + '/api/auth/login';

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // Redirect based on role
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }

      alert(response.data.message);

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error('Login error:', error);
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
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
