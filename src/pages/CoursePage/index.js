import React from "react";
import axios from "axios";
import { Spin } from "antd";
import Lesson from "./Lesson";

import "antd/dist/antd.css";
import "./course.css";

class CoursePage extends React.Component {
  state = {
    course: {},
    lessons: [],
    isLoading: true,
    boughtCourse: false,
  };
  componentDidMount() {
    axios
      .get(
        `https://courses4me.herokuapp.com/courses/${this.props.match.params.id}`
      )
      .then((res) => this.setState({ course: res.data[0], isLoading: false }));
    axios
      .get(
        `https://courses4me.herokuapp.com/lessons?courseId=${this.props.match.params.id}`
      )
      .then((res) => this.setState({ lessons: res.data }));
    console.log("mount");
  }

  componentDidUpdate() {
    if (parseInt(this.props.match.params.id) !== this.state.course.ID) {
      axios
        .get(
          `https://courses4me.herokuapp.com/courses/${this.props.match.params.id}`
        )
        .then((res) =>
          this.setState({ course: res.data[0], isLoading: false })
        );
    }
    console.log(
      "update" + this.props.match.params.id + " " + this.state.course.ID
    );
  }

  handleBuy() {
    alert("You bought course");
    this.setState({ boughtCourse: true });
  }

  getDuration(minutes) {
    let hours = Math.floor(minutes / 60);
    let minute = minutes % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minute < 10 ? "0" + minute : minute
    }:00`;
  }

  convertDate(date) {
    const d = new Date(date);
    return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
  }
  checkIfBought() {
    if (this.state.boughtCourse === true)
      return <Lesson lessons={this.state.lessons} />;
  }
  checkRequest() {
    if (this.state.isLoading) {
      return (
        <div className="course-spinner">
          <Spin />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="heading-wrapper">
            <div className="heading-section">
              <img src={this.state.course.cover_photo} alt="nesto" />
              <div className="course-description">
                <h1>{this.state.course.title}</h1>
                <p>{this.state.course.short_desc}</p>
                <span>
                  Date created: {this.convertDate(this.state.course.created)}
                </span>
                <span>by {this.state.course.teacher}</span>
              </div>
            </div>
          </div>
          <div className="content-section">
            <h2>COURSE INFORMATION</h2>
            <div className="left-content">
              <div className="left-field">
                <span>Duration</span>
                <i className="fas fa-clock"></i>
                {this.getDuration(this.state.course.duration)}
              </div>
              <div className="left-field">
                <span>Category</span>
                <i className="fas fa-code"></i>
                {this.state.course.category}
              </div>
              <div className="left-field">
                <span>Review</span>
                <i className="fas fa-star"></i>
                {this.state.course.rating}
              </div>
            </div>
            <div className="right-content">
              <div className="right-heading">
                <span>Lessons </span>
                <i className="fas fa-book-open"></i>
              </div>
              <div className="lessons-list">
                <ol>
                  {this.state.lessons.map((les) => {
                    return <li key={les.id}>{les.title}</li>;
                  })}
                </ol>
              </div>
            </div>
            <h2>DESCRIPTION</h2>
            <div className="bottom-content">
              <p>{this.state.course.long_desc}</p>
              <button className="buy-button" onClick={() => this.handleBuy()}>
                Buy for {this.state.course.price}$
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="course-wrapper">
        {this.checkRequest()}
        {this.checkIfBought()}
        {console.log("render")}
      </div>
    );
  }
}

export default CoursePage;
