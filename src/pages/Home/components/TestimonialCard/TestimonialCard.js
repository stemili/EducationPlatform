import React from "react";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import "./TestimonialCard.css";
import axios from "axios";
import { Modal, Button, Input, Result } from "antd";
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
    showSuccess: false,
    showError: false,
  };
  componentDidMount() {
    axios
      .get(`https://courses4me.herokuapp.com/testimonials/randomfive`)
      .then((res) => this.setState({ testimonials: res.data }))
      .then(
        () =>
          (this.swiper = new Swiper(".swiper-container", {
            slidesPerView: 1,
            centeredSlides: true,
            direction: this.getDirection(),
            //loop: true,
            initialSlide: 2,
            speed: 800,
            simulateTouch: false,
            allowTouchMove: false,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            breakpoints: {
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 3,
              },
              // when window width is >= 680px
              680: {
                slidesPerView: 5,
              },
            },
          }))
      );
    axios.get("https://courses4me.herokuapp.com/testimonials/").then((res) => {
      if (this.state.currentUser !== null) {
        let checkForTestimonial = res.data.filter(
          (item) => item.username === this.state.currentUser.username
        );
        if (checkForTestimonial.length > 0) {
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
    if (this.state.editTestimonial === false) {
      axios
        .post("https://courses4me.herokuapp.com/testimonials/", {
          username: `${this.state.currentUser.username}`,
          text: `${this.state.textArea}`,
        })
        .then((res) => this.setState({ loading: false, showSuccess: true }))
        .catch((err) => this.setState({ showError: true, loading: false }));
    } else {
      axios
        .put(
          `https://courses4me.herokuapp.com/testimonials/${this.state.currentUser.username}`,
          { text: `${this.state.textArea}` }
        )
        .then((res) => {
          this.setState({ loading: false, showSuccess: true });
        })
        .catch(() => {
          this.setState({ showError: true, loading: false });
        });
    }
  };

  handleCancel = () => {
    this.setState({ visible: false, showSuccess: false, showError: false });
  };

  onTextChange = (e) => {
    this.setState({ textArea: e.target.value });
  };

  handleReturn = () => {
    this.setState({ showSuccess: false, showError: false });
  };

  checkForAnswer = () => {
    if (this.state.showSuccess === true) {
      return <Result status="success" title="Successfully updated review!" />;
    } else if (this.state.showError === true) {
      return (
        <Result
          status="error"
          title="Oops something went wrong. Please try again!"
        />
      );
    } else {
      const { TextArea } = Input;
      return (
        <React.Fragment>
          <p>Maximum number of characters is: 180</p>
          <TextArea
            rows={6}
            value={this.state.textArea}
            onChange={(e) => this.onTextChange(e)}
            maxLength="180"
          />
        </React.Fragment>
      );
    }
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <React.Fragment>
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
        <div className="add-testimonial-section">
          <h1>Want to get featured?</h1>
          <h3>Click below to add your opinion about our website!</h3>
          <button onClick={this.showModal}>
            {this.state.editTestimonial === true ? "Edit your" : "Add a"} review
          </button>
          <Modal
            visible={visible}
            title={`${
              this.state.editTestimonial === true ? "Edit your" : "Add a"
            } review`}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            height="400"
            centered
            footer={
              this.state.showError || this.state.showSuccess
                ? [
                    <Button key="back" onClick={this.handleReturn}>
                      Return
                    </Button>,
                  ]
                : [
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      onClick={this.handleOk}
                    >
                      Submit
                    </Button>,
                  ]
            }
          >
            {this.checkForAnswer()}
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
