import React from 'react';

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-center text-light" aria-label="Footer">
      <div className="container">
        <span>&copy; {new Date().getFullYear()} GovTenders Portal. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
