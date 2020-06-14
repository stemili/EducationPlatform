import React from "react";
import axios from "axios";
import { Spin } from "antd";
import "./course.css";

class CoursePage extends React.Component {
  state = { course: {}, isLoading: true };
  componentDidMount() {
    axios
      .get("https://jsonblob.com/api/fe1b8b48-ae61-11ea-992a-9d6b7d790896")
      .then((res) => {
        const course = res.data;
        this.setState({ course, isLoading: false });
      });
  }
  checkRequest() {
    if (this.state.isLoading)
      return (
        <div className="course-spinner">
          <Spin size="large" />
        </div>
      );
    else
      return (
        <React.Fragment>
          <div className="heading-wrapper">
            <div className="heading-section">
              <img src={this.state.course.img} alt="nesto" />
              <div className="course-description">
                <h1>{this.state.course.title}</h1>
                <p>{this.state.course.shortDescription}</p>
                <span>Date created: {this.state.course.dateCreated}</span>
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
                {this.state.course.length}
              </div>
              <div className="left-field">
                <span>Category</span>
                <i className="fas fa-code"></i>
                Programming
              </div>
              <div className="left-field">
                <span>Review</span>
                <i className="fas fa-star"></i>
                {this.state.course.review}
              </div>
            </div>
            <div className="right-content">
              <div className="right-heading">
                <span>Lessons </span>
                <i className="fas fa-book-open"></i>
              </div>
              <div className="lessons-list">
                <ol>
                  <li>First Lesson</li>
                  <li>Second Lesson</li>
                  <li>Third Lesson</li>
                  <li>Fourth Lesson</li>
                </ol>
              </div>
            </div>
            <h2>DESCRIPTION</h2>
            <div className="bottom-content">
              <p>{this.state.course.description}</p>
              <button>Buy for {this.state.course.price}$</button>
            </div>
          </div>
        </React.Fragment>
      );
  }

  render() {
    return <div className="course-wrapper">{this.checkRequest()}</div>;
  }
}

export default CoursePage;
