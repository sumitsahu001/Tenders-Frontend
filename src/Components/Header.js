import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function dashboardPathForRole(r) {
  if (r === 'contractor') return '/contractor';
  if (r === 'government') return '/government';
  if (r === 'public') return '/public-dashboard';
  return '/';
}

function Header({ setContentText, role, setRole }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const dashboardHref = dashboardPathForRole(role);

  const handleLogout = () => {
    localStorage.removeItem('role'); // Clear from storage
    setRole(null); // Update state instantly
    navigate('/'); // Redirect to home
  };

  return (
    <>
      <a href="#main-content" className="visually-hidden-focusable skip-link">
        Skip to main content
      </a>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-bank2 me-2" aria-hidden="true"></i>
            <span>GovTenders</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {role && isHome ? (
                  <Link
                    className="nav-link"
                    to={dashboardHref}
                    aria-label={`Back to ${role === 'public' ? 'viewer' : role} dashboard`}
                  >
                    Back to Dashboard
                  </Link>
                ) : (
                  <Link
                    className={`nav-link${isHome ? ' active' : ''}`}
                    aria-current={isHome ? 'page' : undefined}
                    to="/"
                  >
                    Home
                  </Link>
                )}
              </li>

              {role ? (
                <>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link${location.pathname === '/register' ? ' active' : ''}`}
                      aria-current={location.pathname === '/register' ? 'page' : undefined}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link${location.pathname === '/login' ? ' active' : ''}`}
                      aria-current={location.pathname === '/login' ? 'page' : undefined}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
