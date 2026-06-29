import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// Icon component for contact and feature listings
const InfoIcon = ({ type }) => {
  const icons = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-info me-2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success me-2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning me-2">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="d-inline-flex align-items-center">{icons[type]}</div>;
};

function Centerpiece() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const graphicVariants = {
    hidden: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
    visible: {
      clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
      transition: { duration: 1.0, ease: "circOut", delay: 0.05 }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // Triggers smoothly every time it scrolls into view
      variants={containerVariants}
      className="container my-5 py-0 px-0 rounded shadow-lg overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f241b 0%, #0d121c 50%, #2b1912 100%)',
        border: '1px solid #1e293b',
      }}
      aria-labelledby="centerpiece-heading"
    >
      <Helmet>
        <title>What You Can Do | GovTenders Bidding Portal</title>
        <meta name="description" content="Discover how contractors and administrators benefit from the GovTenders Portal. Explore secure government bidding, contract management, and transparent tracking tools." />
      </Helmet>

      <div className="d-flex flex-col-reverse flex-lg-row align-items-stretch w-100">
        
        {/* Left Side: Content Grid */}
        <div className="w-100 p-4 p-md-5 w-lg-60" style={{ flex: '1 1 60%' }}>
          
          {/* Top Header: Logo Info & Slogan */}
          <motion.div className="mb-4" variants={itemVariants}>
            <div className="d-flex align-items-center mb-1">
              <i className="bi bi-bank2 text-primary fs-3 me-2" aria-hidden="true"></i>
              <span className="fs-5 fw-bold text-light">GovTenders System</span>
            </div>
            <p className="text-uppercase tracking-wider text-muted small fw-semibold" style={{ letterSpacing: '1.5px', color: '#ff9933 !important' }}>
              National Bidding & Contract Portal
            </p>
          </motion.div>

          {/* Main Content Title */}
          <motion.div variants={itemVariants}>
            <h2 id="centerpiece-heading" className="display-6 fw-bold text-light mb-3">
              How GovTenders Helps You
            </h2>
            <div className="bg-primary mb-4" style={{ height: '3px', width: '80px', borderRadius: '2px' }}></div>
            <p className="text-secondary mb-4 fs-6">
              A secure, transparent, and auditable digital hub built for contractors and government officials. Manage bidding activities, submit documentation, and track contract approvals under strict official oversight.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="row g-4 mb-5">
            {/* User Features Card */}
            <motion.div className="col-md-6" variants={itemVariants}>
              <article 
                className="h-100 p-3 rounded" 
                style={{ 
                  backgroundColor: '#111726', 
                  borderLeft: '4px solid #198754',
                  border: '1px solid #1e293b' 
                }} 
                aria-label="Contractor Features"
              >
                <h3 className="h5 text-light mb-3 d-flex align-items-center">
                  <i className="bi bi-person-check-fill me-2 text-success" aria-hidden="true"></i>
                  For Contractors & Bidders
                </h3>
                <ul className="list-unstyled mb-0 small text-secondary">
                  <li className="mb-2 d-flex align-items-start">
                    <i className="bi bi-search me-2 text-warning pt-1" aria-hidden="true"></i>
                    <span>Browse and search active bidding opportunities</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start">
                    <i className="bi bi-pencil-square me-2 text-success pt-1" aria-hidden="true"></i>
                    <span>Submit digital bids online with zero paperwork</span>
                  </li>
                  <li className="mb-0 d-flex align-items-start">
                    <i className="bi bi-clipboard-data me-2 text-primary pt-1" aria-hidden="true"></i>
                    <span>Track contract applications with real-time status</span>
                  </li>
                </ul>
              </article>
            </motion.div>

            {/* Admin Features Card */}
            <motion.div className="col-md-6" variants={itemVariants}>
              <article 
                className="h-100 p-3 rounded" 
                style={{ 
                  backgroundColor: '#111726', 
                  borderLeft: '4px solid #fd7e14',
                  border: '1px solid #1e293b'
                }} 
                aria-label="Admin Features"
              >
                <h3 className="h5 text-light mb-3 d-flex align-items-center">
                  <i className="bi bi-person-badge-fill me-2 text-warning" aria-hidden="true"></i>
                  For Admins & Officials
                </h3>
                <ul className="list-unstyled mb-0 small text-secondary">
                  <li className="mb-2 d-flex align-items-start">
                    <i className="bi bi-journal-check me-2 text-info pt-1" aria-hidden="true"></i>
                    <span>Review, approve, and finalize bidding proposals</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start">
                    <i className="bi bi-people-fill me-2 text-success pt-1" aria-hidden="true"></i>
                    <span>Oversee registered bidders and verify profiles</span>
                  </li>
                  <li className="mb-0 d-flex align-items-start">
                    <i className="bi bi-bar-chart-line-fill me-2 text-primary pt-1" aria-hidden="true"></i>
                    <span>Monitor contract analytics and audit log reports</span>
                  </li>
                </ul>
              </article>
            </motion.div>
          </div>

          {/* Bottom Section: Why Choose Us */}
          <motion.div className="mb-5 p-3 rounded" style={{ backgroundColor: '#111726', border: '1px solid #1e293b' }} variants={itemVariants}>
            <h3 className="h6 text-light mb-3 d-flex align-items-center">
              <i className="bi bi-patch-check-fill me-2 text-success" aria-hidden="true"></i>
              Why Choose GovTenders?
            </h3>
            <ul className="list-unstyled mb-0 small text-secondary">
              <li className="mb-2">
                <strong>Transparent Bidding:</strong> Fully digital workflow prevents tampering, ensuring equal opportunities.
              </li>
              <li className="mb-2">
                <strong>Accessible Interface:</strong> Built with high contrast, semantic code, and keyboard-friendly navigation.
              </li>
              <li className="mb-0">
                <strong>Secure Authentication:</strong> Role-based access controls keep administrative actions secure and auditable.
              </li>
            </ul>
          </motion.div>

          {/* Footer Info */}
          <motion.div className="border-top pt-4" style={{ borderColor: '#1e293b !important' }} variants={itemVariants}>
            <div className="row g-3 text-secondary" style={{ fontSize: '0.785rem' }}>
              <div className="col-sm-4 d-flex align-items-center">
                <InfoIcon type="website" />
                <a href="https://personal-portfolio-sumit-sahu.netlify.app" target="_blank" rel="noopener noreferrer" className="text-secondary text-decoration-none hover-accent">
                  portfolio-sumit-sahu
                </a>
              </div>
              <div className="col-sm-4 d-flex align-items-center">
                <InfoIcon type="phone" />
                <span>+91 8602723989</span>
              </div>
              <div className="col-sm-4 d-flex align-items-center">
                <InfoIcon type="address" />
                <span>Pune, Maharashtra, IN</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Graphic with clipPath entry animation and white container background */}
        <motion.div 
          className="d-none d-lg-block w-lg-40"
          variants={graphicVariants}
          style={{ 
            flex: '1 1 40%',
            backgroundImage: 'url("/section.png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#ffffff',
            position: 'relative'
          }}
        >
          {/* Overlay to blend image into background edges subtly */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(13, 18, 28, 0.05), transparent)',
            zIndex: 1,
            pointerEvents: 'none'
          }}></div>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default Centerpiece;