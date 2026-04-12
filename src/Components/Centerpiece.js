import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
// Bootstrap and Bootstrap Icons are already globally imported in the project

// This component is the centerpiece for the homepage, guiding users and admins
// about the platform's purpose, features, and unique value. It is designed to be
// accessible, SEO-friendly, and visually engaging, while matching the site's dark theme.
function Centerpiece() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container my-5 py-4 px-3 rounded shadow-lg bg-dark text-light"
      aria-labelledby="centerpiece-heading"
      tabIndex={0} // Allows keyboard users to focus this section
      style={{ outline: 'none' }}
    >
      {/* SEO meta tags for this section */}
      <Helmet>
        <title>What You Can Do | GovTenders Portal</title>
        <meta name="description" content="Discover how users and admins benefit from the GovTenders Portal. Learn how we solve real problems in government tenders with transparency, accessibility, and ease of use." />
      </Helmet>
      {/* Main heading for screen readers and SEO */}
      <h2 id="centerpiece-heading" className="text-center mb-4 display-5 fw-bold">
        How GovTenders Portal Helps You
      </h2>
      <div className="row g-4 align-items-stretch">
        {/* User Features Card */}
        <motion.div
          className="col-md-6"
         
        >
          <article className="card h-100 bg-secondary bg-opacity-75 border-0 shadow-sm position-relative user-card" aria-label="User Features">
            <div className="card-body">
              <h3 className="card-title h4 mb-3 d-flex align-items-center">
                <i className="bi bi-person-check-fill me-2 text-info" aria-hidden="true"></i>
                For Users & Contractors
              </h3>
              <ul className="list-unstyled mb-3">
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-search me-2 text-warning" aria-hidden="true"></i>
                  <span>Browse and search official government tenders easily</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-pencil-square me-2 text-success" aria-hidden="true"></i>
                  <span>Apply for tenders online — no paperwork hassle</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-clipboard-data me-2 text-primary" aria-hidden="true"></i>
                  <span>Track your applications and get real-time updates</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-shield-check me-2 text-secondary" aria-hidden="true"></i>
                  <span>Transparent, fair, and secure process for everyone</span>
                </li>
              </ul>
              <div className="alert alert-info p-2 small mb-0" role="status">
                <i className="bi bi-lightbulb me-1" aria-hidden="true"></i>
                <span>Tip: You only need a simple registration to get started!</span>
              </div>
            </div>
          </article>
        </motion.div>
        {/* Admin Features Card */}
        <motion.div
          className="col-md-6"
          
        >
          <article className="card h-100 bg-secondary bg-opacity-75 border-0 shadow-sm position-relative admin-card" aria-label="Admin Features">
            <div className="card-body">
              <h3 className="card-title h4 mb-3 d-flex align-items-center">
                <i className="bi bi-person-badge-fill me-2 text-warning" aria-hidden="true"></i>
                For Admins & Officials
              </h3>
              <ul className="list-unstyled mb-3">
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-journal-check me-2 text-info" aria-hidden="true"></i>
                  <span>Review, approve, and manage all tender applications</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-people-fill me-2 text-success" aria-hidden="true"></i>
                  <span>Oversee registered contractors and their activity</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-bar-chart-line-fill me-2 text-primary" aria-hidden="true"></i>
                  <span>Access reports and analytics for better decision-making</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-shield-lock me-2 text-secondary" aria-hidden="true"></i>
                  <span>Maintain platform security and data integrity</span>
                </li>
              </ul>
              <div className="alert alert-warning p-2 small mb-0" role="status">
                <i className="bi bi-info-circle me-1" aria-hidden="true"></i>
                <span>Admins are verified for extra security and trust.</span>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
      {/* Real Problems & Unique Value Section */}
      <div className="row mt-5">
        <div className="col-12">
          <section className="p-4 rounded bg-dark bg-opacity-50 border border-info shadow-sm" aria-label="Platform Benefits">
            <h3 className="h5 mb-3 d-flex align-items-center">
              <i className="bi bi-patch-check-fill me-2 text-info" aria-hidden="true"></i>
              Why Choose GovTenders Portal?
            </h3>
            <ul className="mb-0 ps-3">
              <li className="mb-2">
                <strong>Solves Real Problems:</strong> No more confusing paperwork, lost applications, or lack of updates. Everything is digital, trackable, and transparent.
              </li>
              <li className="mb-2">
                <strong>Truly Accessible:</strong> Designed for everyone — clear language, keyboard navigation, and high contrast for easy reading.
              </li>
              <li className="mb-2">
                <strong>Fair & Secure:</strong> Both users and admins have clear roles. No hidden steps, no unfair advantage.
              </li>
              <li className="mb-2">
                <strong>Different by Design:</strong> Built to be simple, honest, and supportive — not just another portal, but a real solution for real people.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </motion.section>
  );
}

export default Centerpiece; 