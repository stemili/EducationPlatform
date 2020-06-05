import React from "react";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="thumbnail-card">
        <img src={course.thumbnail} alt="Thumbnail" />
      </div>
      <div className="info-card">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div>
          <div>
            <div className="info-card-review"></div>
            <p className="info-card-price">1999$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
