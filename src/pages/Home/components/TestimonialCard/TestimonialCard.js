import React from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "./TestimonialCard.css";
import avatar from "../../../../resources/avatar1.jpg";

export default class TestimonialCards extends React.Component {
  state = {
    current: 2,
    testimonials: [
      {
        userID: "rad1na",
        testimonial:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolore, dolores consequatur rem recusandae tenetur. Repellendus, mollitia! Nihil quidem architecto aut amet minus quisquam reprehenderit dolore. Consequuntur dolores qui laudantium.",
      },
      {
        userID: "rad1na1",
        testimonial:
          "Sint dolore, dolores consequatur rem recusandae tenetur. Repellendus, mollitia!",
      },
      {
        userID: "rad1na2",
        testimonial:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe sapiente corrupti, illo modi deleniti in ipsam, quos aperiam aliquam incidunt eveniet ullam. Architecto numquam qui nulla, sunt rem aperiam animi!",
      },
      {
        userID: "rad1na3",
        testimonial:
          " Saepe sapiente corrupti, illo modi deleniti in ipsam, quos aperiam aliquam incidunt eveniet ullam.",
      },
      {
        userID: "rad1na4",
        testimonial: "Architecto numquam qui nulla, sunt rem aperiam animi!",
      },
    ],
  };
  componentDidMount() {
    this.swiper = new Swiper(".swiper-container", {
      slidesPerView: 5,
      centeredSlides: true,
      direction: this.getDirection(),
      //loop: true,
      initialSlide: 2,
      speed: 800,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //on: {
      //  resize: function () {
      //    this.swiper.changeDirection(this.getDirection());
      //  },
      //},
    });
  }

  getDirection() {
    var direction = window.innerWidth <= 760 ? "vertical" : "horizontal";
    return direction;
  }

  renderTestimonials() {
    const items = this.state.testimonials.map(item => {
      return (
        <div className="swiper-slide" key={item.userID}>
          <div className="swiper-inner-circle">
            <img src={avatar} alt="User" />
          </div>
        </div>
      );
    });
    return items;
  }
  handleClick = e => {
    let value = e.target.classList.value;
    return value.includes("swiper-button-next") && value !== 4
      ? this.setState({ current: this.state.current + 1 })
      : value.includes("swiper-button-prev") && value !== 0
      ? this.setState({ current: this.state.current - 1 })
      : console.log(this.state.current);
  };

  render() {
    return (
      <div className="testimonial-section">
        <h1>What do people say about us?</h1>
        <div className="swiper-container">
          <div className="swiper-wrapper">{this.renderTestimonials()}</div>
          <div
            className="swiper-button-next"
            onClick={e => this.handleClick(e)}
          ></div>
          <div
            className="swiper-button-prev"
            onClick={e => this.handleClick(e)}
          ></div>
        </div>
        <div className="testimonial-text-box">
          <i className="fas fa-quote-left"></i>
          <i className="fas fa-caret-down"></i>
          <span>{this.state.testimonials[this.state.current].testimonial}</span>
          <i className="fas fa-quote-right"></i>
        </div>
      </div>
    );
  }
}
