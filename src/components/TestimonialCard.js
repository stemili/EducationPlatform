import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "../styles/TestimonialCard.css";
import avatar from "../resources/avatar1.jpg";
const testimonials = [
  {
    userID: "rad1na",
    testimonial: "Perfect site",
  },
  {
    userID: "rad1na1",
    testimonial: "Perfect site",
  },
  {
    userID: "rad1na2",
    testimonial: "Perfect site",
  },
  {
    userID: "rad1na3",
    testimonial: "Perfect site",
  },
  {
    userID: "rad1na4",
    testimonial: "Perfect site",
  },
  {
    userID: "rad1na5",
    testimonial: "Perfect site",
  },
  {
    userID: "rad1na6",
    testimonial: "Perfect site",
  },
];

const TestimonialCard = (props) => {
  useEffect(() => {
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 5,
      centeredSlides: true,
      direction: getDirection(),
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        resize: function () {
          swiper.changeDirection(getDirection());
        },
      },
    });

    function getDirection() {
      var direction = window.innerWidth <= 760 ? "vertical" : "horizontal";

      return direction;
    }
  });
  const renderTestimonials = testimonials.map((item) => {
    return (
      <div className="swiper-slide">
        <div className="swiper-inner-circle" key={item.userID}>
          <img src={avatar} />
        </div>
      </div>
    );
  });

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">{renderTestimonials}</div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};
export default TestimonialCard;
