import React from "react";
import axios from "axios";
import { Spin } from "antd";
import "./course.css";
import "antd/dist/antd.css";

export class CoursePage extends React.Component {
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
          <div className="heading-section">
            <div className="course-image">
              <img src={this.state.course.img} alt="nesto" />
            </div>
            <div className="course-description">
              <h1>{this.state.course.title}</h1>
              <p>{this.state.course.shortDescription}</p>
              <span>{this.state.course.dateCreated}</span>
              <span>{this.state.course.teacher}</span>
            </div>
          </div>
          <div className="content-section">
            <div className="content-description"></div>
          </div>
        </React.Fragment>
      );
  }

  render() {
    return (
      <div className="course-wrapper">
        {this.checkRequest()}
        <Spin size="large" />
      </div>
    );
  }
}

export default CoursePage;
