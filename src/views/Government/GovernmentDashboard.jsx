/**
 * @file GovernmentDashboard.jsx
 * @description Central control panel for Government Officials to publish and manage tenders.
 * Developed to simulate real-world B2B lifecycle and maintain total platform transparency.
 * - Sumit Sahu
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function GovernmentDashboard() {
  const navigate = useNavigate();

  const adminActions = [
    {
      id: 1,
      title: 'Create New Tender',
      description: 'Publish a new government project for bidding.',
      icon: 'bi-plus-circle-fill',
      path: '/government/create-tender',
      color: 'primary',
    },
    {
      id: 2,
      title: 'Manage Tenders',
      description: 'Review applications and award contracts.',
      icon: 'bi-file-earmark-text-fill',
      path: '/government/tenders',
      color: 'success',
    },
    {
      id: 3,
      title: 'Registered Contractors',
      description: 'View and verify active bidders on the platform.',
      icon: 'bi-people-fill',
      path: '/government/contractors',
      color: 'info',
    },
    {
      id: 4,
      title: 'Reports & Analytics',
      description: 'Visualize platform activity and spending.',
      icon: 'bi-bar-chart-fill',
      path: '/government/analytics',
      color: 'warning',
    },
  ];
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - GovTenders Portal</title>
        <meta name="description" content="Admin dashboard for managing government tenders and user accounts." />
      </Helmet>
      <div className="container mt-4 mb-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="display-5 fw-bold text-primary">Government Admin Panel</h1>
            <p className="text-muted">Welcome back! Manage your tenders and oversee applications.</p>
          </div>
        </div>

        <div className="row g-4">
          {adminActions.map((action) => (
            <div key={action.id} className="col-md-6 col-lg-3">
              <div 
                className="card h-100 shadow-sm border-0 cursor-pointer hover-shadow transition-all"
                onClick={() => navigate(action.path)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center p-4">
                  <div className={`display-4 mb-3 text-${action.color}`}>
                    <i className={`bi ${action.icon}`}></i>
                  </div>
                  <h3 className="h5 fw-bold mb-2">{action.title}</h3>
                  <p className="text-muted small mb-0">{action.description}</p>
                </div>
                <div className="card-footer bg-transparent border-0 text-center pb-4">
                  <button className={`btn btn-sm btn-outline-${action.color} rounded-pill px-4`}>
                    Open Module
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm bg-primary text-white p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="fw-bold mb-2">Need to announce a new project?</h2>
                  <p className="mb-0 opacity-75">Quickly publish a tender to reach thousands of verified contractors.</p>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <button 
                    className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-primary"
                    onClick={() => navigate('/government/create-tender')}
                  >
                    Post Tender
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GovernmentDashboard;
