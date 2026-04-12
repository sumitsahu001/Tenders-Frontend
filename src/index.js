import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PopupProvider } from './context/PopupContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <PopupProvider>
        <App />
      </PopupProvider>
    </BrowserRouter>
  </HelmetProvider>
);

