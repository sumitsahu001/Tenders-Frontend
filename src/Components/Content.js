import React from 'react';

function Content({ text, setContentText }) {
  return (
    <main className="main-content" id="main-content" aria-label="Main content">
      <section>
        <h1 className="mb-4">Welcome to the Government Tenders Portal</h1>
        {/* Centerpiece: visually guides users/admins and explains the platform */}
        
        <p>{text}</p>
      </section>
    </main>
  );
}

export default Content;
