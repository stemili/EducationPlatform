import React from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "./TestimonialCard.css";
import axios from "axios";
import { Modal, Button, Input } from "antd";
import Auth from "../../../../auth/AuthService";

export default class TestimonialCards extends React.Component {
  state = {
    current: 2,
    testimonials: [],
    loading: false,
    visible: false,
    currentUser: Auth.getCurrentUser(),
    textArea: "",
    editTestimonial: false,
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
    axios.get("https://courses4me.herokuapp.com/testimonials/").then((res) => {
      if (this.state.currentUser !== null) {
        let checkForTestimonial = res.data.filter(
          (item) => item.username === this.state.currentUser.username
        );
        if (checkForTestimonial.length > 0) {
          console.log(checkForTestimonial);
          this.setState({
            editTestimonial: true,
            textArea: `${checkForTestimonial[0].text}`,
          });
        }
      }
    });
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
                item.picture
                  ? item.picture
                  : "https://www.in-tend.co.uk/images/default.jpg"
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

  showModal = () => {
    if (this.state.currentUser) {
      this.setState({
        visible: true,
      });
    } else {
      this.props.toggleModal(true, "login");
    }
  };

  handleOk = () => {
    this.setState({ loading: true });
    if (this.state.testimonials === false) {
      axios
        .post("https://courses4me.herokuapp.com/testimonials/", {
          username: `${this.state.currentUser.username}`,
          text: `${this.state.textArea}`,
        })
        .then((res) => this.setState({ loading: false }))
        .catch((err) => console.log(err.message));
    } else {
      axios
        .put(
          `https://courses4me.herokuapp.com/testimonials/${this.state.currentUser.username}`,
          { text: `${this.state.textArea}` }
        )
        .then((res) => {
          console.log(res);
          this.setState({ loading: false });
        });
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onTextChange = (e) => {
    this.setState({ textArea: e.target.value });
  };

  render() {
    const { visible, loading } = this.state;
    const { TextArea } = Input;
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
        <div className="add-testimonial-section">
          <h2>
            Want to get featured? Click below to add your opinion about our
            website!
          </h2>
          <button onClick={this.showModal}>
            {this.state.editTestimonial === true ? "Edit" : "Add"} a review
          </button>
          <Modal
            visible={visible}
            title={`${
              this.state.editTestimonial === true ? "Edit" : "Add"
            } a review`}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={this.handleOk}
              >
                Submit
              </Button>,
            ]}
          >
            <p>Maximum number of words: 180</p>
            <TextArea
              rows={4}
              value={this.state.textArea}
              onChange={(e) => this.onTextChange(e)}
              maxLength="180"
            />
          </Modal>
        </div>
      </div>
    );
  }
}
