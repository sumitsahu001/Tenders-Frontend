import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { usePopup } from '../../context/PopupContext';

function GovernmentAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showPopup } = usePopup();

  const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/tenders/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
        setLoading(false);
      } catch (err) {
        showPopup('Error fetching analytics', 'error');
        setLoading(false);
      }
    };

    fetchStats();
  }, [showPopup]);

  if (loading) return <div className="container mt-5 text-center"><h3>Loading Analytics...</h3></div>;

  const statCards = [
    {
      title: 'Total Tenders',
      value: stats.totalTenders,
      icon: 'bi-file-earmark-text',
      color: 'primary',
      desc: 'All published projects'
    },
    {
      title: 'Active Tenders',
      value: stats.openTenders,
      icon: 'bi-unlock-fill',
      color: 'success',
      desc: 'Currently accepting bids'
    },
    {
      title: 'Closed Tenders',
      value: stats.closedTenders,
      icon: 'bi-lock-fill',
      color: 'secondary',
      desc: 'Bidding completed'
    },
    {
      title: 'Total Spending',
      value: stats.totalBudget,
      icon: 'bi-currency-rupee',
      color: 'warning',
      desc: 'Estimated platform budget'
    }
  ];

  return (
    <div className="container mt-4 mb-5">
      <Helmet>
        <title>Reports & Analytics - GovTenders</title>
      </Helmet>

      <div className="mb-4">
        <h2 className="fw-bold text-primary">Platform Analytics</h2>
        <p className="text-muted">High-level summary of your tender activities and spending.</p>
      </div>

      {/* Stat Cards Row */}
      <div className="row g-4 mb-5">
        {statCards.map((card, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
              <div className="card-body p-4">
                <div className={`d-flex align-items-center mb-3 text-${card.color}`}>
                  <div className={`bg-${card.color}-subtle p-3 rounded-3 me-3`} style={{ backgroundColor: `var(--bs-${card.color}-bg-subtle)` }}>
                    <i className={`bi ${card.icon} fs-3`}></i>
                  </div>
                  <h6 className="card-subtitle mb-0 fw-bold">{card.title}</h6>
                </div>
                <h2 className="card-title fw-bold mb-1">{card.value}</h2>
                <p className="card-text text-muted small mb-0">{card.desc}</p>
              </div>
              <div className={`bg-${card.color}`} style={{ height: '4px', opacity: 0.7 }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Breakdown Section */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-4">Tender Status Distribution</h5>
            <div className="d-flex align-items-center mb-3">
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between mb-1">
                  <span className="small fw-bold">Open Tenders</span>
                  <span className="small text-muted">{Math.round((stats.openTenders / stats.totalTenders) * 100 || 0)}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: `${(stats.openTenders / stats.totalTenders) * 100}%` }}></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between mb-1">
                  <span className="small fw-bold">Closed Tenders</span>
                  <span className="small text-muted">{Math.round((stats.closedTenders / stats.totalTenders) * 100 || 0)}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-secondary" role="progressbar" style={{ width: `${(stats.closedTenders / stats.totalTenders) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-primary text-white">
            <h5 className="fw-bold mb-3">Quick Insight</h5>
            <p className="opacity-75">
              {stats.openTenders > 0 
                ? `You have ${stats.openTenders} active projects currently receiving bids. Ensure you review applications regularly to maintain platform momentum.`
                : "All your projects are currently closed or awarded. Post a new tender to start receiving bids from verified contractors."}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default GovernmentAnalytics;
