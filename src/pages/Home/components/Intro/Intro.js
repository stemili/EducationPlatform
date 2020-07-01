import React from "react";
import "./Intro.css";
import AuthService from "../../../../auth/AuthService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiCall from "../../../../service/apiCall";

const Intro = ({ toggleModal }) => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    apiCall.get("/users/teachers-count").then(res => setTeacherCount(res.data));
    apiCall.get("/courses/count").then(res => setCourseCount(res.data));
  }, []);

  return (
    <div className="intro-main">
      <div className="intro-image-layer"></div>
      <div className="intro-content-layer">
        <div className="container intro-quote">
          <p className="intro-message-mobile">
            Welcome to <span>Discite</span> <br />
            <span>Let us help you get started!</span>
          </p>
          <p className="intro-message-desktop">
            {/* <i className="fas fa-quote-left"></i> */}
            Every student can learn,
            <br /> just not on the same day, <br /> or the same way.
            {/* <i className="fas fa-quote-right"></i> */}
          </p>
          {AuthService.getCurrentUser() ? (
            <Link to="userprofile">
              <button className="btn intro-btn">My Profile</button>
            </Link>
          ) : (
            <button
              onClick={() => toggleModal(true, "signup")}
              className="btn intro-btn"
            >
              Join Us
            </button>
          )}
        </div>
      </div>
      <div className="intro-min-info">
        <div className="container intro-info-flex">
          <span className="mobile-info-intro-crs">
            {courseCount} <i className="fas fa-book-open"></i> Available Courses
          </span>
          <span className="disabled">24/7 Customer Support</span>
          <span>{teacherCount} Teachers From The Entire World</span>
          <span>{courseCount} Available Courses</span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
