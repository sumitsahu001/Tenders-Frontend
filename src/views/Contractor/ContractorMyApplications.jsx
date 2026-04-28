/**
 * @file ContractorMyApplications.jsx
 * @description Lists this contractor's tender applications and workflow status (mock rows until backend exists).
 * - Sumit Sahu
 */
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ContractorBrowseTenders.css';
import './ContractorMyApplications.css';

const STATUS_META = {
  submitted: { label: 'Submitted', className: 'my-app-status--submitted' },
  under_review: { label: 'Under review', className: 'my-app-status--under_review' },
  shortlisted: { label: 'Shortlisted', className: 'my-app-status--shortlisted' },
  rejected: { label: 'Rejected', className: 'my-app-status--rejected' },
  awarded: { label: 'Awarded', className: 'my-app-status--awarded' },
};

function ContractorMyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiurl = process.env.REACT_APP_API_URL + '/api/applications/my';
        const res = await axios.get(apiurl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setApplications(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load your applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const listVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.07,
          delayChildren: prefersReducedMotion ? 0 : 0.05,
        },
      },
    }),
    [prefersReducedMotion]
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReducedMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [prefersReducedMotion]
  );

  return (
    <>
      <Helmet>
        <title>My Applications - GovTenders Portal</title>
        <meta
          name="description"
          content="Track your government tender applications and review status updates."
        />
      </Helmet>

      <div className="contractor-catalog-shell">
        <div className="container browse-tenders-page mt-3 mt-md-4">
          <motion.div
            className="browse-tenders-hero browse-tenders-hero--cover"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
              <div>
                <p className="browse-tenders-kicker text-success small fw-semibold mb-1 text-uppercase">
                  Contractor
                </p>
                <h1 className="text-success mb-0">My applications</h1>
              </div>
              <Link
                to="/contractor"
                className="btn btn-outline-secondary align-self-stretch align-self-md-center"
                aria-label="Back to contractor dashboard"
              >
                <i className="bi bi-arrow-left me-1" aria-hidden="true" />
                Back to dashboard
              </Link>
            </div>
          </motion.div>

          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading applications...</span>
              </div>
              <p className="mt-3 text-muted">Fetching your application history...</p>
            </div>
          ) : error ? (
            <div className="col-12 text-center py-5">
              <div className="alert alert-danger d-inline-block px-4 py-3 shadow-sm border-0">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            </div>
          ) : applications.length === 0 ? (
            <motion.div
              className="my-apps-empty"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <i className="bi bi-inbox display-4 text-muted mb-3 d-block" aria-hidden="true" />
              <h2 className="h5 text-light mb-2">No applications yet</h2>
              <p className="text-muted small mb-3">
                When you apply to tenders, each submission will show up here with the latest status.
              </p>
              <Link to="/contractor/tenders" className="btn btn-primary">
                Browse tenders
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="row g-4 browse-tenders-cards"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              role="list"
              aria-label="Your tender applications"
            >
              {applications.map((app) => {
                const status = STATUS_META[app.status] || STATUS_META.submitted;
                return (
                  <motion.div
                    key={app._id}
                    className="col-12 col-md-6 col-xl-4"
                    variants={cardVariants}
                    role="listitem"
                  >
                    <article className="my-app-card" aria-labelledby={`app-title-${app._id}`}>
                      <div className="my-app-card__accent" aria-hidden="true" />
                      <div className="my-app-card__body">
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                          <span className="text-muted small font-monospace">#{app._id.slice(-6).toUpperCase()}</span>
                          <span className={`my-app-status ${status.className}`}>{status.label}</span>
                        </div>
                        <h2 id={`app-title-${app._id}`} className="my-app-card__title">
                          {app.tender?.title || 'Unknown Tender'}
                        </h2>
                        <div className="my-app-meta">
                          <i className="bi bi-hash" aria-hidden="true" />
                          <span>Ref: {app._id}</span>
                        </div>
                        <div className="my-app-meta">
                          <i className="bi bi-building" aria-hidden="true" />
                          <span>{app.tender?.department || 'N/A'}</span>
                        </div>
                        <div className="my-app-meta">
                          <i className="bi bi-calendar-check" aria-hidden="true" />
                          <span>Submitted: {new Date(app.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="my-app-card__footer">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-primary fw-bold">₹{app.bidAmount.toLocaleString('en-IN')}</span>
                            <Link
                              to="/contractor/tenders"
                              className="btn btn-outline-primary btn-sm"
                              aria-label={`Open tender catalog to find ${app.tender?.title}`}
                            >
                              <i className="bi bi-grid-3x3-gap me-1" aria-hidden="true" />
                              Browse Catalog
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContractorMyApplications;
