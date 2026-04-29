import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { usePopup } from '../../context/PopupContext';

function GovernmentContractors() {
  const [contractors, setContractors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { showPopup } = usePopup();

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/auth/contractors`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContractors(res.data.data);
        setLoading(false);
      } catch (err) {
        showPopup('Error fetching contractors', 'error');
        setLoading(false);
      }
    };

    fetchContractors();
  }, [showPopup]);

  // Client-side filtering logic
  const filteredContractors = contractors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="container mt-5 text-center"><h3>Loading Contractors...</h3></div>;

  return (
    <div className="container mt-4 mb-5">
      <Helmet>
        <title>Registered Contractors - GovTenders</title>
      </Helmet>

      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold text-primary">Registered Contractors</h2>
          <p className="text-muted">Manage and verify bidders on the platform.</p>
        </div>
        <div className="col-md-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-0">
              <i className="bi bi-search text-primary"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-0 p-3" 
              placeholder="Search by name, city, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 ps-4">Contractor Name</th>
                <th className="p-3">Contact Details</th>
                <th className="p-3">Location</th>
                <th className="p-3">Gender</th>
                <th className="p-3 text-end pe-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContractors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <i className="bi bi-people-fill display-1 text-muted opacity-25"></i>
                    <p className="mt-3 text-muted">No contractors found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredContractors.map(c => (
                  <tr key={c._id}>
                    <td className="p-3 ps-4">
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle bg-light-primary text-primary me-3 d-flex align-items-center justify-content-center fw-bold rounded-circle" style={{ width: '45px', height: '45px', backgroundColor: '#e7f1ff' }}>
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{c.name}</div>
                          <div className="small text-muted">ID: {c._id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="small"><i className="bi bi-envelope me-2 text-primary"></i>{c.email}</div>
                      <div className="small"><i className="bi bi-phone me-2 text-primary"></i>{c.mobile}</div>
                    </td>
                    <td className="p-3">
                      <div className="small fw-bold">{c.city}</div>
                      <div className="small text-muted">{c.state}, {c.country}</div>
                    </td>
                    <td className="p-3">
                      <span className="badge bg-light text-dark border">{c.gender}</span>
                    </td>
                    <td className="p-3 text-end pe-4">
                      <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                        <i className="bi bi-check-circle-fill me-1"></i> Verified
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 text-end text-muted small">
        Showing {filteredContractors.length} of {contractors.length} registered contractors
      </div>
    </div>
  );
}

export default GovernmentContractors;
