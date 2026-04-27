/**
 * @file Register.jsx
 * @description Handles new user registration (Contractor / Government setup).
 * Written with care to ensure scalable data ingestion.
 * - Sumit Sahu
 */
import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import { showPopup } from '../../context/popupApi';
import { getLocationSelectStyles } from './locationSelectStyles';
import {
  getCityOptions,
  getCountryOptions,
  getIsoCodeForCountryName,
  getIsoCodeForStateName,
  getStateOptions,
} from './locationHelpers';

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
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const apiurl = process.env.REACT_APP_API_URL + '/api/auth/register';

  // Validate individual field
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Full Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name can only contain letters and spaces';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;

      case 'mobile':
        if (!value) {
          error = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Mobile number must be exactly 10 digits';
        }
        break;

      case 'address':
        if (!value.trim()) {
          error = 'Address is required';
        } else if (value.trim().length < 10) {
          error = 'Please enter a complete address (min 10 characters)';
        }
        break;

      case 'country':
        if (!value) error = 'Country is required';
        break;

      case 'state':
        if (!value) error = 'State is required';
        break;

      case 'city':
        if (!value) error = 'City is required';
        break;

      case 'gender':
        if (!value) error = 'Please select gender';
        break;

      case 'role':
        if (!value) error = 'Please select a role';
        break;

      default:
        break;
    }

    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset dependent fields
      ...(name === 'country' ? { state: '', city: '' } : {}),
      ...(name === 'state' ? { city: '' } : {})
    }));
    
    // Real-time validation if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle field blur
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const countryOptions = useMemo(() => getCountryOptions(), []);

  const countryIso = useMemo(
    () => getIsoCodeForCountryName(formData.country),
    [formData.country]
  );

  const stateOptions = useMemo(
    () => (countryIso ? getStateOptions(countryIso) : []),
    [countryIso]
  );

  const stateIso = useMemo(
    () => getIsoCodeForStateName(countryIso, formData.state),
    [countryIso, formData.state]
  );

  const cityOptions = useMemo(
    () =>
      countryIso && stateIso ? getCityOptions(countryIso, stateIso) : [],
    [countryIso, stateIso]
  );

  const countrySelectValue = useMemo(() => {
    if (!formData.country || !countryIso) return null;
    return { value: countryIso, label: formData.country };
  }, [formData.country, countryIso]);

  const stateSelectValue = useMemo(() => {
    if (!formData.state || !stateIso) return null;
    return { value: stateIso, label: formData.state };
  }, [formData.state, stateIso]);

  const citySelectValue = useMemo(() => {
    if (!formData.city) return null;
    return { value: formData.city, label: formData.city };
  }, [formData.city]);

  const handleCountrySelect = (opt) => {
    const name = opt?.label ?? '';
    setFormData((prev) => ({
      ...prev,
      country: name,
      state: '',
      city: '',
    }));
    setErrors((prev) => {
      const next = { ...prev, state: '', city: '' };
      if (touched.country) {
        next.country = validateField('country', name);
      }
      return next;
    });
  };

  const handleStateSelect = (opt) => {
    const name = opt?.label ?? '';
    setFormData((prev) => ({
      ...prev,
      state: name,
      city: '',
    }));
    setTouched((prev) => ({ ...prev, state: true }));
    setErrors((prev) => ({
      ...prev,
      state: validateField('state', name),
      city: '',
    }));
  };

  const handleCitySelect = (opt) => {
    const name = opt?.label ?? '';
    setFormData((prev) => ({ ...prev, city: name }));
    setTouched((prev) => ({ ...prev, city: true }));
    setErrors((prev) => ({
      ...prev,
      city: validateField('city', name),
    }));
  };

  const countrySelectStyles = useMemo(
    () =>
      getLocationSelectStyles({
        invalid: Boolean(touched.country && errors.country),
        valid: Boolean(touched.country && !errors.country && formData.country),
      }),
    [touched.country, errors.country, formData.country]
  );

  const stateSelectStyles = useMemo(
    () =>
      getLocationSelectStyles({
        invalid: Boolean(touched.state && errors.state),
        valid: Boolean(touched.state && !errors.state && formData.state),
      }),
    [touched.state, errors.state, formData.state]
  );

  const citySelectStyles = useMemo(
    () =>
      getLocationSelectStyles({
        invalid: Boolean(touched.city && errors.city),
        valid: Boolean(touched.city && !errors.city && formData.city),
      }),
    [touched.city, errors.city, formData.city]
  );

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.is-invalid');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      const res = await axios.post(apiurl, formData);
      if (res.status === 201 || res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('name', res.data.name);

        if (setRole) setRole(res.data.role);

        showPopup({
          message: 'Registration successful. Welcome aboard.',
          variant: 'success',
          title: 'Account created',
        });

        if (res.data.role === 'contractor') {
          navigate('/contractor');
        } else if (res.data.role === 'government') {
          navigate('/government');
        } else {
          navigate('/public-dashboard');
        }
      }
    } catch (error) {
      showPopup({
        message:
          error.response?.data?.message ||
          'Something went wrong. Please try again.',
        variant: 'error',
        title: 'Registration failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''} ${touched.name && !errors.name && formData.name ? 'is-valid' : ''}`}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              value={formData.name} 
              placeholder="Enter full name"
            />
            {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input 
              name="email" 
              type="email" 
              className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''} ${touched.email && !errors.email && formData.email ? 'is-valid' : ''}`}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              value={formData.email} 
              placeholder="example@mail.com"
            />
            {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''} ${touched.password && !errors.password && formData.password ? 'is-valid' : ''}`}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                value={formData.password} 
                placeholder="Min 6 characters"
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' }}
              >
                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
          </div>

          {/* Mobile */}
          <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input 
              name="mobile" 
              type="text" 
              className={`form-control ${touched.mobile && errors.mobile ? 'is-invalid' : ''} ${touched.mobile && !errors.mobile && formData.mobile ? 'is-valid' : ''}`}
              onChange={handleChange}
              onBlur={() => handleBlur('mobile')}
              value={formData.mobile} 
              placeholder="10 digit number"
              maxLength="10"
            />
            {touched.mobile && errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>

          

          {/* Country — data: country-state-city; search: react-select (isSearchable) */}
          <div className="col-md-4">
            <label className="form-label" htmlFor="register-country">
              Country
            </label>
            <Select
              inputId="register-country"
              instanceId="register-country"
              options={countryOptions}
              value={countrySelectValue}
              onChange={handleCountrySelect}
              onBlur={() => handleBlur('country')}
              placeholder="Search or select country"
              isClearable
              isSearchable
              styles={countrySelectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              noOptionsMessage={() => 'No countries match'}
            />
            {touched.country && errors.country && (
              <div className="invalid-feedback d-block">{errors.country}</div>
            )}
          </div>

          {/* State */}
          <div className="col-md-4">
            <label className="form-label" htmlFor="register-state">
              State
            </label>
            <Select
              inputId="register-state"
              instanceId="register-state"
              options={stateOptions}
              value={stateSelectValue}
              onChange={handleStateSelect}
              onBlur={() => handleBlur('state')}
              placeholder={
                countryIso ? 'Search or select state' : 'Select a country first'
              }
              isDisabled={!countryIso}
              isClearable
              isSearchable
              styles={stateSelectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              noOptionsMessage={() =>
                countryIso ? 'No states match' : 'Pick a country first'
              }
            />
            {touched.state && errors.state && (
              <div className="invalid-feedback d-block">{errors.state}</div>
            )}
          </div>

          {/* City */}
          <div className="col-md-4">
            <label className="form-label" htmlFor="register-city">
              City
            </label>
            <Select
              inputId="register-city"
              instanceId="register-city"
              options={cityOptions}
              value={citySelectValue}
              onChange={handleCitySelect}
              onBlur={() => handleBlur('city')}
              placeholder={
                stateIso ? 'Search or select city' : 'Select a state first'
              }
              isDisabled={!stateIso}
              isClearable
              isSearchable
              styles={citySelectStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              noOptionsMessage={() =>
                stateIso ? 'No cities match' : 'Pick a state first'
              }
            />
            {touched.city && errors.city && (
              <div className="invalid-feedback d-block">{errors.city}</div>
            )}
          </div>

          {/* Address */}
          <div className="col-12">
            <label className="form-label">Address</label>
            <textarea 
              name="address" 
              rows="2" 
              className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''} ${touched.address && !errors.address && formData.address ? 'is-valid' : ''}`}
              onChange={handleChange}
              onBlur={() => handleBlur('address')}
              value={formData.address}
              placeholder="Street, locality, etc."
            ></textarea>
            {touched.address && errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label className="form-label">Gender *</label>
            <div className="d-flex gap-3 pt-2">
              <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female</label>
            </div>
            {touched.gender && errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
          </div>

          {/* Role */}
          <div className="col-md-6">
            <label className="form-label">Role *</label>
            <select 
              name="role" 
              className={`form-control ${touched.role && errors.role ? 'is-invalid' : ''} ${touched.role && !errors.role && formData.role ? 'is-valid' : ''}`}
              onChange={handleChange}
              onBlur={() => handleBlur('role')}
              value={formData.role}
            >
              <option value="">Select Role</option>
              <option value="contractor">Contractor (Bidder)</option>
              <option value="government">Government Official</option>
            </select>
            {touched.role && errors.role && <div className="invalid-feedback">{errors.role}</div>}
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
