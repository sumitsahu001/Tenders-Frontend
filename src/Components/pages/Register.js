import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiurl = process.env.REACT_APP_API_URL + '/api/auth/register';

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const userDetails = { name, email, password, mobile, address, city, gender, role };

    try {
      const res = await axios.post(apiurl, userDetails);
      if (res.status === 201 || res.status === 200) {
        alert('Successfully registered');
        // Clear form
        setName(''); setEmail(''); setPassword('');
        setMobile(''); setAddress(''); setCity(''); setGender(''); setRole('');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - GovTenders Portal</title>
        <meta name="description" content="Register for a GovTenders account to participate in official government tenders." />
      </Helmet>

      <form className="container mt-4">
        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label>Name:</label>
            <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label>Email:</label>
            <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} value={email} />
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label>Password:</label>
            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} value={password} />
          </div>

          {/* Mobile */}
          <div className="col-md-6">
            <label>Mobile:</label>
            <input type="text" className="form-control" onChange={e => setMobile(e.target.value)} value={mobile} />
          </div>

          {/* Address */}
          <div className="col-12">
            <label>Address:</label>
            <textarea rows="3" className="form-control" onChange={e => setAddress(e.target.value)} value={address}></textarea>
          </div>

          {/* City */}
          <div className="col-md-6">
            <label>City:</label>
            <select className="form-control" onChange={e => setCity(e.target.value)} value={city}>
              <option value="">Select City</option>
              <option>Indore</option>
              <option>Bhopal</option>
              <option>Ujjain</option>
            </select>
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label>Gender:</label>
            <div>
              Male <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={e => setGender(e.target.value)} />
              Female <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={e => setGender(e.target.value)} />
            </div>
          </div>

          {/* Role */}
          <div className="col-md-6">
            <label>Role:</label>
            <select className="form-control" onChange={e => setRole(e.target.value)} value={role}>
              <option value="">Select Role</option>
              <option value="user">Bidder</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <div className="col-12 text-center mt-3">
            <button type="button" className="btn btn-success px-4" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
