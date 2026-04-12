/**
 * @file ContractorMyApplications.jsx
 * @description Lists this contractor's tender applications and workflow status (mock rows until backend exists).
 * - Sumit Sahu
 */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
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

/** Replace with GET /api/applications/me (or similar) when wired */
const MOCK_APPLICATIONS = [
  {
    id: 'app-2026-1042',
    tenderId: 't-2026-001',
    tenderTitle: 'Smart City Road Development — Phase II',
    department: 'Urban Development Department',
    submittedOn: '12 March 2026',
    status: 'under_review',
  },
  {
    id: 'app-2026-1038',
    tenderId: 't-2026-003',
    tenderTitle: 'Rural Water Supply — 500 Villages Package',
    department: 'Public Health Engineering Department',
    submittedOn: '08 March 2026',
    status: 'shortlisted',
  },
  {
    id: 'app-2026-1011',
    tenderId: 't-2026-004',
    tenderTitle: 'Government Cloud DR Site — Managed Services',
    department: 'National Informatics Centre',
    submittedOn: '22 February 2026',
    status: 'submitted',
  },
  {
    id: 'app-2025-0891',
    tenderId: 't-2025-014',
    tenderTitle: 'District Hospital Equipment & Maintenance',
    department: 'State Health Mission',
    submittedOn: '15 January 2026',
    status: 'rejected',
  },
  {
    id: 'app-2025-0712',
    tenderId: 't-2025-009',
    tenderTitle: 'National Highway Corridor — Feasibility Study',
    department: 'Ministry of Road Transport',
    submittedOn: '02 December 2025',
    status: 'awarded',
  },
];

function ContractorMyApplications() {
  const prefersReducedMotion = useReducedMotion();

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

          {MOCK_APPLICATIONS.length === 0 ? (
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
              {MOCK_APPLICATIONS.map((app) => {
                const status = STATUS_META[app.status] || STATUS_META.submitted;
                return (
                  <motion.div
                    key={app.id}
                    className="col-12 col-md-6 col-xl-4"
                    variants={cardVariants}
                    role="listitem"
                  >
                    <article className="my-app-card" aria-labelledby={`app-title-${app.id}`}>
                      <div className="my-app-card__accent" aria-hidden="true" />
                      <div className="my-app-card__body">
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                          <span className="text-muted small font-monospace">{app.id}</span>
                          <span className={`my-app-status ${status.className}`}>{status.label}</span>
                        </div>
                        <h2 id={`app-title-${app.id}`} className="my-app-card__title">
                          {app.tenderTitle}
                        </h2>
                        <div className="my-app-meta">
                          <i className="bi bi-hash" aria-hidden="true" />
                          <span>Tender ref: {app.tenderId}</span>
                        </div>
                        <div className="my-app-meta">
                          <i className="bi bi-building" aria-hidden="true" />
                          <span>{app.department}</span>
                        </div>
                        <div className="my-app-meta">
                          <i className="bi bi-calendar-check" aria-hidden="true" />
                          <span>Submitted: {app.submittedOn}</span>
                        </div>
                        <div className="my-app-card__footer">
                          <Link
                            to="/contractor/tenders"
                            className="btn btn-outline-primary btn-sm"
                            aria-label={`Open tender catalog to find ${app.tenderTitle}`}
                          >
                            <i className="bi bi-grid-3x3-gap me-1" aria-hidden="true" />
                            View tender catalog
                          </Link>
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
