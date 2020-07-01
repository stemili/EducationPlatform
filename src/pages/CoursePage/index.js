import React from "react";
import apiCall from "../../service/apiCall";
import { Spin } from "antd";
import Auth from "../../auth/AuthService";
import CourseHeading from "./components/CourseHeading/CourseHeading";
import { CourseInformation } from "./components/CourseInformation/CourseInformation";
import "antd/dist/antd.css";
import "./course.css";
import AuthService from "../../auth/AuthService";

class CoursePage extends React.Component {
  state = {
    course: {},
    lessons: [],
    courseUsers: [],
    currentUser: Auth.getCurrentUser(),
    isLoading: true,
    isEnrolled: false,
    isTeacher: false,
  };

  componentDidMount() {
    apiCall
      .get(`/courses/${this.props.match.params.id}`)
      .then(res => this.setState({ course: res.data[0] }));

    apiCall
      .get(`/lessons/course/${this.props.match.params.id}`)
      .then(res => this.setState({ lessons: res.data, isLoading: false }));
    apiCall
      .get(`/courses/${this.props.match.params.id}/users`)
      .then(res => this.setState({ courseUsers: res.data }));
    this.checkifEnrolled();
  }

  componentDidUpdate() {
    if (parseInt(this.props.match.params.id) !== this.state.course.id) {
      apiCall
        .get(`/courses/${this.props.match.params.id}`)
        .then(res => this.setState({ course: res.data[0], isLoading: false }));
      apiCall
        .get(`/lessons/course/${this.props.match.params.id}`)
        .then(res => this.setState({ lessons: res.data }));
      apiCall
        .get(`/courses/${this.props.match.params.id}/users`)
        .then(res =>
          this.setState({ courseUsers: res.data, isEnrolled: false })
        );
    }
    this.checkifEnrolled();
  }

  componentWillUnmount() {
    this.setState({ course: {}, lessons: [], courseUsers: [] });
  }

  handleBuy = () => {
    if (this.state.currentUser) {
      apiCall
        .post(
          `/courses/${this.props.match.params.id}`,
          {
            username: `${this.state.currentUser.username}`,
          },
          {
            headers: {
              authorization: AuthService.getAuthHeader(),
            },
          }
        )
        .then(res => alert(res.data.success))
        .then(() => this.setState({ isEnrolled: true }))
        .catch(err => console.log(err));
    } else {
      this.props.toggleModal(true, "login");
      // alert("You have to log-in first");
    }
  };

  checkIfLoading() {
    if (this.state.isLoading) {
      return (
        <div className="course-spinner">
          <Spin />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <CourseHeading course={this.state.course} />
          <CourseInformation
            course={this.state.course}
            lessons={this.state.lessons}
            handleBuy={this.handleBuy}
            isEnrolled={this.state.isEnrolled}
            isTeacher={this.state.isTeacher}
          />
        </React.Fragment>
      );
    }
  }

  checkifEnrolled() {
    if (this.state.isEnrolled === false && this.state.currentUser !== null) {
      if (this.state.currentUser.role_id === "administrator") {
        this.setState({ isEnrolled: true });
      } else if (
        this.state.currentUser.username === this.state.course.teacher
      ) {
        this.setState({ isEnrolled: true, isTeacher: true });
      } else if (
        this.state.currentUser.role_id === "student" ||
        this.state.currentUser.role_id === "teacher"
      ) {
        const checkForUser = this.state.courseUsers.filter(
          user => user.username === this.state.currentUser.username
        );
        if (checkForUser.length === 1) {
          this.setState({ isEnrolled: true });
        }
      }
    }
  }

  render() {
    return <div className="course-wrapper">{this.checkIfLoading()}</div>;
  }
}

export default CoursePage;
