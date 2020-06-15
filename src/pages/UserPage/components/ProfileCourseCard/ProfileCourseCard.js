import React from "react";
import { Link } from "react-router-dom";
import "./ProfileCourseCard.css";

const ProfileCourseCard = ({ course }) => {
  return (
    <div>
      <div className="profile-course-card">
        <div className="profile-thumbnail-card">
          <img src={course.thumbnail} alt="Thumbnail" />
          <p className="profile-thumbnail-category">
            {course.category.toUpperCase()}
          </p>
        </div>

        <div className="profile-info-card">
          <div className="profile-card-top-info">
            <Link to={`/course/${course.id}`}>
              <h3>{course.title}</h3>
            </Link>
            <p>{course.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCourseCard;
