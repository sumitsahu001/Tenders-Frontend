import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer 
      className="footer mt-auto py-5 text-light" 
      style={{ 
        backgroundColor: '#090d16', 
        borderTop: '1px solid #1e293b' 
      }} 
      aria-label="Official Portal Footer"
    >
      <div className="container">
        
        {/* Top Level: 3-Column Layout */}
        <div className="row g-4 justify-content-between">
          
          {/* Column 1: Portal Identity (5 Cols) */}
          <div className="col-lg-5 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-bank2 text-primary fs-4 me-2" aria-hidden="true"></i>
              <span className="h5 mb-0 fw-bold text-light">GovTenders System</span>
            </div>
            <p className="text-secondary small lh-base mb-3">
              A secure, transparent, and auditable digital hub built for contractor bidding and contract verification. Built with React and Node.js to ensure high performance and cryptographic standard logging.
            </p>
            <div className="d-flex align-items-center small" style={{ color: '#94a3b8' }}>
              <i className="bi bi-shield-check text-success fs-5 me-2" aria-hidden="true"></i>
              <span>SSL Secured & Certified System</span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 Cols) */}
          <div className="col-lg-3 col-md-6">
            <h2 className="h6 text-uppercase fw-bold text-light mb-3" style={{ letterSpacing: '0.5px' }}>
              Quick Links
            </h2>
            <ul className="list-unstyled mb-0 small">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none hover-accent">
                  Portal Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-secondary text-decoration-none hover-accent">
                  Sign In / Access
                </Link>
              </li>
              <li className="mb-0">
                <Link to="/register" className="text-secondary text-decoration-none hover-accent">
                  Register Contractor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer Portfolio Branding (4 Cols) */}
          <div className="col-lg-4 col-md-6">
            <h2 className="h6 text-uppercase fw-bold text-light mb-3" style={{ letterSpacing: '0.5px' }}>
              Developed By
            </h2>
            <div className="p-3 rounded" style={{ backgroundColor: '#111726', border: '1px solid #1e293b' }}>
              <p className="text-secondary small mb-2">
                Designed & Developed by:
              </p>
              <h3 className="h6 text-light fw-bold mb-1">
                Sumit Sahu
              </h3>
              <p className="small mb-3 lh-sm" style={{ color: '#94a3b8' }}>
                Junior Software Developer | MERN Stack & AI Specialist
              </p>
              <a 
                href="https://personal-portfolio-sumit-sahu.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-sm w-100 py-1"
                style={{ fontSize: '0.785rem' }}
              >
                View Developer Portfolio
              </a>
            </div>
          </div>

        </div>

        {/* Horizontal Divider */}
        <hr className="my-4" style={{ borderColor: '#1e293b' }} />

        {/* Bottom Level: Copyrights */}
        <div className="row align-items-center g-3 text-secondary" style={{ fontSize: '0.785rem' }}>
          <div className="col-12 text-center text-md-start">
            <span>
              &copy; {new Date().getFullYear()} GovTenders Portal. All rights reserved.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
