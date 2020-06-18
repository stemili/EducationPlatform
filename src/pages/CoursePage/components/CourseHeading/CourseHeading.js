import React, { useState, useEffect } from "react";
import "./CourseHeading.css";

export const CourseHeading = (props) => {
  const [currentCourse, setCourse] = useState(props.course);

  function convertDate(date) {
    const d = new Date(date);
    return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
  }

  return (
    <div className="heading-wrapper">
      <div className="heading-section">
        <img src={currentCourse.cover_photo} alt="nesto" />
        <div className="course-description">
          <h1>{currentCourse.title}</h1>
          <p>{currentCourse.short_desc}</p>
          <span>Date created: {convertDate(currentCourse.created)}</span>
          <span>by {currentCourse.teacher}</span>
        </div>
      </div>
    </div>
  );
};
