import React, { useState, useEffect } from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "../styles/TestimonialCard.css";
import avatar from "../resources/avatar1.jpg";

const TestimonialCard = (props) => {
  const [testimonials, setTestimonials] = useState([
    {
      userID: "rad1na",
      testimonial: "Perfect site 0",
    },
    {
      userID: "rad1na1",
      testimonial: "Perfect site 1",
    },
    {
      userID: "rad1na2",
      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe sapiente corrupti, illo modi deleniti in ipsam, quos aperiam aliquam incidunt eveniet ullam. Architecto numquam qui nulla, sunt rem aperiam animi!",
    },
    {
      userID: "rad1na3",
      testimonial: "Perfect site 3",
    },
    {
      userID: "rad1na4",
      testimonial: "Perfect site 4",
    },
  ]);
  const [currentTestimonial, setCurrentTestimonal] = useState(2);
  console.log(currentTestimonial);
  console.log("render");

  useEffect(() => {
    console.log("useffect");
    var swiper = new Swiper(
      ".swiper-container",
      {
        slidesPerView: 5,
        centeredSlides: true,
        direction: getDirection(),
        //loop: true,
        initialSlide: 2,
        speed: 800,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          resize: function () {
            swiper.changeDirection(getDirection());
          },
        },
      },
      []
    );

    function getDirection() {
      var direction = window.innerWidth <= 760 ? "vertical" : "horizontal";

      return direction;
    }
  });
  const checkNext = () => {
    currentTestimonial === 4
      ? setCurrentTestimonal(0)
      : setCurrentTestimonal(currentTestimonial + 1);
  };
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
    <div className="testimonial-section">
      <div className="swiper-container">
        <div className="swiper-wrapper">{renderTestimonials}</div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
      <div class="testimonial-text-box">
        <i className="fas fa-quote-left"></i>
        <i className="fas fa-caret-down"></i>
        <span>{testimonials[currentTestimonial].testimonial}</span>
        <i className="fas fa-quote-right"></i>
      </div>
    </div>
  );
};
export default TestimonialCard;
