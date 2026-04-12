/**
 * @file ContractorBrowseTenders.jsx
 * @description Contractor catalog: government-published tenders (mock data until gov module ships).
 * Open tenders allow Apply; closed tenders are view-only.
 * - Sumit Sahu
 */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { showPopup } from '../../context/popupApi';
import './ContractorBrowseTenders.css';

/** Placeholder catalog — swap for API when government tender module is live */
const MOCK_TENDERS = [
  {
    id: 't-2026-001',
    title: 'Smart City Road Development — Phase II',
    department: 'Urban Development Department',
    deadline: '30 September 2026',
    budget: '₹150 Crore',
    status: 'open',
  },
  {
    id: 't-2026-002',
    title: '50 MW Solar Power Plant — Western Grid',
    department: 'Ministry of New and Renewable Energy',
    deadline: '15 November 2026',
    budget: '₹200 Crore',
    status: 'open',
  },
  {
    id: 't-2026-003',
    title: 'Rural Water Supply — 500 Villages Package',
    department: 'Public Health Engineering Department',
    deadline: '10 December 2026',
    budget: '₹80 Crore',
    status: 'open',
  },
  {
    id: 't-2025-014',
    title: 'District Hospital Equipment & Maintenance',
    department: 'State Health Mission',
    deadline: '28 February 2026',
    budget: '₹12 Crore',
    status: 'closed',
  },
  {
    id: 't-2025-009',
    title: 'National Highway Corridor — Feasibility Study',
    department: 'Ministry of Road Transport',
    deadline: '01 January 2026',
    budget: '₹45 Crore',
    status: 'closed',
  },
  {
    id: 't-2026-004',
    title: 'Government Cloud DR Site — Managed Services',
    department: 'National Informatics Centre',
    deadline: '20 August 2026',
    budget: '₹35 Crore',
    status: 'open',
  },
];

function ContractorBrowseTenders() {
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

  const handleApply = (tender) => {
    showPopup({
      title: 'Interest recorded',
      message: `You chose to apply for "${tender.title}". Full submission will open once the application module is connected to the backend.`,
      variant: 'success',
    });
  };

  return (
    <>
      <Helmet>
        <title>Browse Tenders - GovTenders Portal</title>
        <meta
          name="description"
          content="Browse open government tenders. Apply to opportunities published by departments."
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
              <p className="browse-tenders-kicker text-primary small fw-semibold mb-1 text-uppercase">
                Contractor
              </p>
              <h1 className="text-primary mb-0">Government tender catalog</h1>
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

        <motion.div
          className="row g-4 browse-tenders-cards"
          variants={listVariants}
          initial="hidden"
          animate="visible"
          role="list"
          aria-label="Government tenders"
        >
          {MOCK_TENDERS.map((tender) => {
            const isOpen = tender.status === 'open';
            return (
              <motion.div
                key={tender.id}
                className="col-12 col-md-6 col-xl-4"
                variants={cardVariants}
                role="listitem"
              >
                <article
                  className={`browse-tender-card ${isOpen ? '' : 'browse-tender-card--closed'}`}
                  aria-labelledby={`tender-title-${tender.id}`}
                >
                  <div className="browse-tender-card__accent" aria-hidden="true" />
                  <div className="browse-tender-card__body">
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <span className="text-muted small font-monospace">{tender.id}</span>
                      <span
                        className={`browse-tender-status ${isOpen ? 'browse-tender-status--open' : 'browse-tender-status--closed'}`}
                      >
                        {isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <h2 id={`tender-title-${tender.id}`} className="browse-tender-card__title">
                      {tender.title}
                    </h2>
                    <div className="browse-tender-meta">
                      <i className="bi bi-building" aria-hidden="true" />
                      <span>{tender.department}</span>
                    </div>
                    <div className="browse-tender-meta">
                      <i className="bi bi-calendar-event" aria-hidden="true" />
                      <span>Deadline: {tender.deadline}</span>
                    </div>
                    <div className="browse-tender-meta">
                      <i className="bi bi-currency-rupee" aria-hidden="true" />
                      <span>Budget: {tender.budget}</span>
                    </div>
                    <div className="browse-tender-card__actions">
                      {isOpen ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-apply-tender"
                          onClick={() => handleApply(tender)}
                          aria-label={`Submit interest for ${tender.title}`}
                        >
                          <i className="bi bi-send-fill me-2" aria-hidden="true" />
                          Apply
                        </button>
                      ) : (
                        <button type="button" className="btn btn-secondary btn-apply-tender" disabled aria-disabled="true">
                          Closed — not accepting applications
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
        </div>
      </div>
    </>
  );
}

export default ContractorBrowseTenders;
