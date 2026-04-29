import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { usePopup } from '../../context/PopupContext';

function GovernmentManageTenders() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTender, setSelectedTender] = useState(null);
  const [applications, setApplications] = useState([]);
  const [fetchingApps, setFetchingApps] = useState(false);
  const { showPopup } = usePopup();

  const API_BASE_URL = 'http://localhost:5000/api';

  // 1. Fetch Tenders created by this admin
  const fetchTenders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/tenders/my-tenders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTenders(res.data.data);
      setLoading(false);
    } catch (err) {
      showPopup('Error fetching tenders', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  // 2. Fetch Applications for a specific tender
  const handleViewApplications = async (tender) => {
    setSelectedTender(tender);
    setFetchingApps(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/applications/tender/${tender._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data.data);
      setFetchingApps(false);
    } catch (err) {
      showPopup('Error fetching applications', 'error');
      setFetchingApps(false);
    }
  };

  // 3. Award functionality
  const handleAward = async (appId) => {
    if (!window.confirm('Are you sure you want to award this tender? This will close the tender and reject other bids.')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/applications/${appId}/award`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showPopup('Tender Awarded Successfully!', 'success');
      
      // Refresh data
      fetchTenders();
      setSelectedTender(null);
    } catch (err) {
      showPopup(err.response?.data?.message || 'Error awarding tender', 'error');
    }
  };

  if (loading) return <div className="container mt-5 text-center"><h3>Loading Tenders...</h3></div>;

  return (
    <div className="container mt-4 mb-5">
      <Helmet>
        <title>Manage Tenders - GovTenders</title>
      </Helmet>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Manage My Tenders</h2>
        <span className="badge bg-primary rounded-pill">{tenders.length} Total</span>
      </div>

      <div className="row">
        {/* Tenders List */}
        <div className={selectedTender ? "col-md-5" : "col-12"}>
          {tenders.length === 0 ? (
            <div className="card p-5 text-center shadow-sm border-0">
              <i className="bi bi-file-earmark-x display-1 text-muted mb-3"></i>
              <h4>No tenders found</h4>
              <p className="text-muted">You haven't published any tenders yet.</p>
            </div>
          ) : (
            <div className="list-group shadow-sm">
              {tenders.map(tender => (
                <div 
                  key={tender._id} 
                  className={`list-group-item list-group-item-action p-4 border-0 mb-2 rounded shadow-sm ${selectedTender?._id === tender._id ? 'border-start border-primary border-4' : ''}`}
                  onClick={() => handleViewApplications(tender)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-bold mb-1">{tender.title}</h5>
                      <p className="text-muted small mb-2"><i className="bi bi-building me-1"></i>{tender.department}</p>
                      <div className="d-flex gap-2">
                        <span className={`badge rounded-pill ${tender.status === 'open' ? 'bg-success' : 'bg-secondary'}`}>
                          {tender.status.toUpperCase()}
                        </span>
                        <span className="text-primary fw-bold small">Budget: {tender.budget}</span>
                      </div>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Applications Detail View */}
        {selectedTender && (
          <div className="col-md-7">
            <div className="card shadow border-0 h-100">
              <div className="card-header bg-white border-0 p-4 pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <h4 className="fw-bold text-dark">{selectedTender.title}</h4>
                  <p className="text-muted small">Applications for this project</p>
                </div>
                <button className="btn-close" onClick={() => setSelectedTender(null)}></button>
              </div>

              <div className="card-body p-4">
                {fetchingApps ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2">Fetching bids...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-people display-4 text-muted mb-3"></i>
                    <p>No applications received yet for this tender.</p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {applications.map(app => (
                      <div key={app._id} className="col-12">
                        <div className={`card border-0 shadow-sm p-3 ${app.status === 'awarded' ? 'bg-light-success border-start border-success border-4' : ''}`}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="fw-bold mb-1">{app.contractor.name}</h6>
                              <p className="small text-muted mb-2">{app.contractor.email}</p>
                              <div className="badge bg-info text-dark mb-2">Bid: {app.bidAmount}</div>
                              <p className="small mb-0 text-dark" style={{ fontStyle: 'italic' }}>
                                "{app.proposal.substring(0, 100)}..."
                              </p>
                            </div>
                            <div className="text-end">
                              {app.status === 'awarded' ? (
                                <span className="badge bg-success p-2 px-3">Winner</span>
                              ) : selectedTender.status === 'open' ? (
                                <button 
                                  className="btn btn-primary btn-sm rounded-pill px-3"
                                  onClick={() => handleAward(app._id)}
                                >
                                  Award
                                </button>
                              ) : (
                                <span className="badge bg-secondary">Closed</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GovernmentManageTenders;
