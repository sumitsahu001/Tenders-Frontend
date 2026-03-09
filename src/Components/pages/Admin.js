import React from 'react';
import { Helmet } from 'react-helmet-async';

function Admin() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - GovTenders Portal</title>
        <meta name="description" content="Admin dashboard for managing government tenders and user accounts." />
      </Helmet>
      <div className="container-fluid bg-light min-vh-100 py-4">
        <div className="container">
          <h1 className="text-center text-primary mb-4">
            Government Tenders - Admin Panel
          </h1>
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Dashboard</h2>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  📑 <strong>View & Approve Tenders</strong>
                </li>
                <li className="list-group-item">
                  📌 <strong>Manage Registered Contractors</strong>
                </li>
                <li className="list-group-item">
                  ⚙️ <strong>System Settings</strong>
                </li>
                <li className="list-group-item">
                  📊 <strong>Reports & Analytics</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
