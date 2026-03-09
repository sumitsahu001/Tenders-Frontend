import React from 'react';
import first from '../assets/firstt.png'; 
import second from '../assets/first1.webp';
import third from '../assets/second2.jpg';

const Coursor = () => {
  return (
    <section aria-label="Featured Tenders Carousel">
      <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel" aria-live="polite" role="region">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={first} className="d-block w-100" alt="Government tender announcement" />
          </div>
          <div className="carousel-item">
            <img src={second} className="d-block w-100" alt="Contractor submitting tender bid" />
          </div>
          <div className="carousel-item">
            <img src={third} className="object-fit w-100" alt="Official government tender document" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
          aria-label="Previous slide"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
          aria-label="Next slide"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Coursor;
