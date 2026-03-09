import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet-async';

function Usercomponent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all session data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate("/login"); // redirect to login page
  };

  return (
    <>
      <Helmet>
        <title>User Dashboard - GovTenders Portal</title>
        <meta name="description" content="User dashboard to view, apply, and track government tenders." />
      </Helmet>
      <div className="container mt-4">
        <h1 className="text-center text-primary">Government Tenders - User Dashboard</h1>

        <div className="card shadow-sm mt-4" role="region" aria-label="Available Tenders">
          <div className="card-body">
            <h2 className="card-title text-secondary">Available Tenders</h2>
            <p className="card-text">
              Explore and apply for various government tenders. Stay updated with the latest opportunities.
            </p>
            <button className="btn btn-primary" tabIndex={0} aria-label="View available tenders">View Tenders</button>
          </div>
        </div>

        <div className="card shadow-sm mt-3" role="region" aria-label="My Applications">
          <div className="card-body">
            <h2 className="card-title text-secondary">My Applications</h2>
            <p className="card-text">
              Track the status of your tender applications and manage your submissions.
            </p>
            <button className="btn btn-success" tabIndex={0} aria-label="View my applications">View Applications</button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={handleLogout} tabIndex={0} aria-label="Logout">Logout</button>
        </div>
      </div>
    </>
  );
}

export default Usercomponent;
