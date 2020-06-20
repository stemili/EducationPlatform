import React, { useState, useEffect } from "react";
import "./CourseInformation.css";
import { Link } from "react-router-dom";

export const CourseInformation = (props) => {
  const [currentCourse, setCourse] = useState(props.course);
  const [currentLessons, setLessons] = useState(props.lessons);

  useEffect(() => {
    setCourse(props.course);
  }, [props.course]);
  useEffect(() => {
    setLessons(props.lessons);
  }, [props.lessons]);

  function getDuration(minutes) {
    let hours = Math.floor(minutes / 60);
    let minute = minutes % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minute < 10 ? "0" + minute : minute
    }:00`;
  }
  return (
    <div className="content-section">
      <h2>COURSE INFORMATION</h2>
      <div className="left-content">
        <div className="left-field">
          <span>Duration</span>
          <i className="fas fa-clock"></i>
          {getDuration(currentCourse.duration)}
        </div>
        <div className="left-field">
          <span>Category</span>
          <i className="fas fa-book"></i>
          {currentCourse.category}
        </div>
        <div className="left-field">
          <span>Review</span>
          <i className="fas fa-star"></i>
          {currentCourse.rating}
        </div>
      </div>
      <div className="right-content">
        <div className="right-heading">
          <span>Lessons </span>
          <i className="fas fa-book-open"></i>
        </div>
        <div className="lessons-list">
          <ol>
            {currentLessons.map((les) => {
              return <li key={les.id}>{les.title}</li>;
            })}
          </ol>
        </div>
      </div>
      <h2>DESCRIPTION</h2>
      <div className="bottom-content">
        <p>{currentCourse.long_desc}</p>
        {props.isEnrolled === true ? (
          <button className="bottom-button go-to">
            <Link to={`/courses/${currentCourse.id}/lessons`}>
              Go to Lessons
            </Link>
          </button>
        ) : (
          <button
            className="bottom-button buy"
            onClick={() => props.handleBuy()}
          >
            Buy for {currentCourse.price}$
          </button>
        )}
      </div>
    </div>
  );
};
