/**
 * @file Register.jsx
 * @description Handles new user registration (Contractor / Government setup).
 * Written with care to ensure scalable data ingestion.
 * - Sumit Sahu
 */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { locationData } from './locationData';

function Register({ setRole }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    country: 'India',
    state: '',
    city: '',
    gender: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const apiurl = process.env.REACT_APP_API_URL + '/api/auth/register';

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }

    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.role) newErrors.role = 'Please select a role';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset dependent fields
      ...(name === 'country' ? { state: '', city: '' } : {}),
      ...(name === 'state' ? { city: '' } : {})
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);

    try {
      const res = await axios.post(apiurl, formData);
      if (res.status === 201 || res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('name', res.data.name);

        if (setRole) setRole(res.data.role);

        alert('Registration Successful!');
        
        if (res.data.role === 'contractor') {
          navigate('/contractor');
        } else if (res.data.role === 'government') {
          navigate('/government');
        } else {
          navigate('/public-dashboard');
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = Object.keys(locationData);
  const states = formData.country ? Object.keys(locationData[formData.country] || {}) : [];
  const cities = (formData.country && formData.state) ? (locationData[formData.country][formData.state] || []) : [];

  return (
    <>
      <Helmet>
        <title>Register - GovTenders Portal</title>
        <meta name="description" content="Register for a GovTenders account." />
      </Helmet>

      <form className="container mt-4 mb-5 p-4 shadow-sm bg-white rounded" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Create Account</h2>
        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input 
              name="name" 
              type="text" 
              className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.name} 
              placeholder="Enter full name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input 
              name="email" 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.email} 
              placeholder="example@mail.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input 
              name="password" 
              type="password" 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.password} 
              placeholder="Min 6 characters"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Mobile */}
          <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input 
              name="mobile" 
              type="text" 
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.mobile} 
              placeholder="10 digit number"
              maxLength="10"
            />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>

          

          {/* Country */}
          <div className="col-md-4">
            <label className="form-label">Country</label>
            <select 
              name="country" 
              className={`form-control ${errors.country ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.country}
            >
              <option value="">Select Country</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <div className="invalid-feedback">{errors.country}</div>}
          </div>

          {/* State */}
          <div className="col-md-4">
            <label className="form-label">State</label>
            <select 
              name="state" 
              className={`form-control ${errors.state ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.state}
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>

          {/* City */}
          <div className="col-md-4">
            <label className="form-label">City</label>
            <select 
              name="city" 
              className={`form-control ${errors.city ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.city}
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.map(ct => <option key={ct} value={ct}>{ct}</option>)}
            </select>
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>

          {/* Address */}
          <div className="col-12">
            <label className="form-label">Address</label>
            <textarea 
              name="address" 
              rows="2" 
              className={`form-control ${errors.address ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.address}
              placeholder="Street, locality, etc."
            ></textarea>
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <div className="d-flex gap-3 pt-2">
              <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female</label>
            </div>
            {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
          </div>

          {/* Role */}
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select 
              name="role" 
              className={`form-control ${errors.role ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              value={formData.role}
            >
              <option value="">Select Role</option>
              <option value="contractor">Contractor (Bidder)</option>
              <option value="government">Government Official</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          {/* Submit */}
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Register Now'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
