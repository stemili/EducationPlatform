import React from "react";
import { Link } from "react-router-dom";
import "./TeacherCourseCard.css";

const TeacherCourseCard = ({ course }) => {
  return (
    <div>
      <div className="teacher-course-card">
        <div className="teacher-thumbnail-card">
          <Link to={`/courses/${course.id}`}>
            <img src={course.cover_photo} alt="Thumbnail" />
            <p className="teacher-thumbnail-category">
              {course.category.toUpperCase()}
            </p>
            <h3>
              {course.title.length > 28
                ? course.title.slice(0, 25) + "..."
                : course.title}
            </h3>
          </Link>
        </div>

        <div className="teacher-info-card">
          <div className="teacher-card-top-info">
            <p>
              {course.short_desc.length > 83
                ? course.short_desc.slice(0, 80) + "..."
                : course.short_desc}
            </p>
            <div className="btn-group-teacher">
              <button className="btn teacher-card-btn-edit disabled">
                Edit Course
              </button>
              <Link
                to={{
                  pathname: "/createcourse",
                  aboutProps: {
                    section: 2,
                    lesson: 0,
                    course,
                  },
                }}
              >
                <button className="btn teacher-card-btn-add">
                  Add Lessons
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseCard;
