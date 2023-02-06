import React from "react";
import office from "../images/office.jpg";
import backpain from "../images/backpain.jpg";
import headache from "../images/headache.jpg";
import family from "../images/family.jpg";
import styled from "styled-components";

function TourCarousel() {
  return (
    <CarouselContainer>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={office} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={backpain} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={headache} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={family} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </CarouselContainer>
  );
}

export default TourCarousel;

const CarouselContainer = styled.div`
  margin: 40px 0;

  .carousel-control-prev {
    width: 5.3%;
    position: absolute;
    top: 0%;
    left: 0%;
  }
  .carousel-control-prev-icon {
    padding: 20px;
  }
  .carousel-control-next {
    width: 5.3%;
    position: absolute;
    top: 0%;
    left: 94.6%;
  }
  .carousel-control-next-icon {
    padding: 20px;
  }
  .carousel-inner {
    width: 100%;
    margin: 0 auto;
  }
  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
  }

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
  }
`;
