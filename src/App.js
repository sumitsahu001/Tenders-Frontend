import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Coursor from './Components/Coursor';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import Main from './Main.js';
import Centerpiece from './Components/Centerpiece.js';
import PublicDashboard from './views/Public/PublicDashboard.jsx'; // MVC View: Public Dashboard

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

function App() {
  const [contentText, setContentText] = useState(
    `Tenders are formal offers or bids submitted by individuals, organizations, or businesses to carry out specific
    projects or supply goods and services...`
  );

  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get current path

  // Keep role in sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Whenever role changes, store it in localStorage
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  // 🚀 Auto-redirect public to dashboard after login
  useEffect(() => {
    if (role === 'public') {
      navigate('/public-dashboard');
    }
  }, [role, navigate]);

  // Hide footer & carousel on focused dashboard / catalog views
  const hideLayout =
    location.pathname === '/public-dashboard' ||
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname.startsWith('/government') ||
    location.pathname.startsWith('/contractor');

  return (
    <>
      <Helmet>
        <title>GovTenders Portal - Official Government Tenders</title>
        <meta
          name="description"
          content="Find, apply, and track official government tenders. Secure, transparent, and user-friendly portal for contractors and suppliers."
        />
      </Helmet>

      <Header setContentText={setContentText} setRole={setRole} role={role} />

      <Routes>
        <Route path="/*" element={<Main role={role} setRole={setRole} />} />
        <Route
          path="/"
          element={<Content text={contentText} setContentText={setContentText} />}
        />
        <Route path="/public-dashboard" element={<PublicDashboard />} />
        {/* Add your government dashboard route if exists */}
      </Routes>

      {/* Show only if NOT on dashboard pages */}
      {!hideLayout && <Coursor />}
      {!hideLayout && <Centerpiece />}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
