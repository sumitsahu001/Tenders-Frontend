import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { showPopup } from '../../context/popupApi';

function GovernmentCreateTender() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    budget: '',
    deadline: '',
    location: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiurl = process.env.REACT_APP_API_URL + '/api/tenders';
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(apiurl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        showPopup({
          title: 'Tender Published',
          message: 'Your tender has been successfully published to the catalog.',
          variant: 'success',
        });
        navigate('/government');
      }
    } catch (error) {
      showPopup({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to publish tender. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Tender - GovTenders Portal</title>
      </Helmet>

      <div className="container mt-4 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 pt-4 pb-0">
                <div className="d-flex align-items-center justify-content-between">
                  <h1 className="h3 fw-bold text-primary mb-0">Create New Tender</h1>
                  <Link to="/government" className="btn btn-outline-secondary btn-sm rounded-pill">
                    <i className="bi bi-arrow-left me-1"></i> Back
                  </Link>
                </div>
                <hr className="mt-4 mb-0" />
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Tender Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="e.g. Smart City Road Development"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Department</label>
                      <select
                        name="department"
                        className="form-select"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="Urban Development">Urban Development</option>
                        <option value="Health Mission">Health Mission</option>
                        <option value="Renewable Energy">Renewable Energy</option>
                        <option value="Road Transport">Road Transport</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Budget (Approx)</label>
                      <input
                        type="text"
                        name="budget"
                        className="form-control"
                        placeholder="e.g. ₹150 Crore"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Deadline</label>
                      <input
                        type="date"
                        name="deadline"
                        className="form-control"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Project Location</label>
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        placeholder="e.g. Bhopal, Madhya Pradesh"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Detailed Description</label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows="5"
                        placeholder="Outline the project requirements and scope of work..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12 text-end mt-4">
                      <button type="button" className="btn btn-light me-2 rounded-pill px-4" onClick={() => navigate('/government')}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary rounded-pill px-5" disabled={isSubmitting}>
                        {isSubmitting ? 'Publishing...' : 'Publish Tender'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GovernmentCreateTender;
