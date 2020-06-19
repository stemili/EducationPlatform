import React from "react";
import axios from "axios";
import { Spin } from "antd";
import Lesson from "./components/Lesson/Lesson";
import { CourseHeading } from "./components/CourseHeading/CourseHeading";
import { CourseInformation } from "./components/CourseInformation/CourseInformation";
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
  }

  componentDidUpdate() {
    if (parseInt(this.props.match.params.id) !== this.state.course.id) {
      axios
        .get(
          `https://courses4me.herokuapp.com/courses/${this.props.match.params.id}`
        )
        .then((res) =>
          this.setState({ course: res.data[0], isLoading: false })
        );
      axios
        .get(
          `https://courses4me.herokuapp.com/lessons?courseId=${this.props.match.params.id}`
        )
        .then((res) => this.setState({ lessons: res.data }));
    }
  }

  handleBuy = () => {
    alert("You bought course");
    this.setState({ boughtCourse: true });
  };

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
    } else if (this.state.boughtCourse !== true) {
      return (
        <React.Fragment>
          <CourseHeading course={this.state.course} />
          <CourseInformation
            course={this.state.course}
            lessons={this.state.lessons}
            handleBuy={this.handleBuy}
          />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="course-wrapper">
        {this.checkRequest()}
        {this.checkIfBought()}
      </div>
    );
  }
}

export default CoursePage;
