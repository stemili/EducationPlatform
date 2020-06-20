import React from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "./TestimonialCard.css";
import axios from "axios";
import avatar from "../../../../resources/avatar1.jpg";

export default class TestimonialCards extends React.Component {
  state = {
    current: 2,
    testimonials: [],
  };
  componentDidMount() {
    axios
      .get(`https://courses4me.herokuapp.com/testimonials/randomfive`)
      .then((res) => this.setState({ testimonials: res.data }))
      .then(
        () =>
          (this.swiper = new Swiper(".swiper-container", {
            slidesPerView: 5,
            centeredSlides: true,
            direction: this.getDirection(),
            //loop: true,
            initialSlide: 2,
            speed: 800,
            simulateTouch: false,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //on: {
            //  resize: function () {
            //    this.swiper.changeDirection(this.getDirection());
            //  },
            //},
          }))
      );
  }

  getDirection() {
    var direction = window.innerWidth <= 760 ? "vertical" : "horizontal";
    return direction;
  }

  renderTestimonials() {
    const items = this.state.testimonials.map((item) => {
      return (
        <div className="swiper-slide" key={item.username}>
          <div className="swiper-inner-circle">
            <img
              src={
                this.state.testimonials[this.state.current].picture
                  ? this.state.testimonials[this.state.current].picture
                  : avatar
              }
              alt="User"
            />
          </div>
        </div>
      );
    });
    return items;
  }
  handleClick = (e) => {
    let value = e.target.classList.value;
    return value.includes("swiper-button-next") && value !== 4
      ? this.setState({ current: this.state.current + 1 })
      : value.includes("swiper-button-prev") && value !== 0
      ? this.setState({ current: this.state.current - 1 })
      : "";
  };

  render() {
    return (
      <div className="testimonial-section">
        <h1>What do people say about us?</h1>
        <div className="swiper-container">
          <div className="swiper-wrapper">{this.renderTestimonials()}</div>
          <div
            className="swiper-button-next"
            onClick={(e) => this.handleClick(e)}
          ></div>
          <div
            className="swiper-button-prev"
            onClick={(e) => this.handleClick(e)}
          ></div>
        </div>
        <div className="testimonial-text-box fadeIn">
          <h2>
            {this.state.testimonials.length !== 0
              ? this.state.testimonials[this.state.current].name +
                " " +
                this.state.testimonials[this.state.current].surname
              : ""}
          </h2>
          <i className="fas fa-quote-left"></i>
          <i className="fas fa-caret-down"></i>
          <span>
            {this.state.testimonials.length !== 0
              ? this.state.testimonials[this.state.current].text
              : ""}
          </span>
          <i className="fas fa-quote-right"></i>
        </div>
      </div>
    );
  }
}
