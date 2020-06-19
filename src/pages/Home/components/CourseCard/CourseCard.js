import React from "react";
import ReactStarRating from "react-star-ratings-component";
import "./CourseCard.css";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="thumbnail-card">
        <img src={course.cover_photo} alt="coverPhoto" />
        <p className="thumbnail-category">{course.category.toUpperCase()}</p>
      </div>

      <div className="info-card">
        <div className="card-top-info">
          <Link to={`/course/${course.ID}`}>
            <h3>
              {course.title.length > 18
                ? course.title.slice(0, 21) + "..."
                : course.title}
            </h3>
          </Link>
          <p className="info-card-teacher">
            by <span>{course.teacher}</span>
          </p>
          <p>
            {course.short_desc.length > 83
              ? course.short_desc.slice(0, 80) + "..."
              : course.short_desc}
          </p>
        </div>

        <div className="card-bottom-info">
          <ReactStarRating
            numberOfStar={5}
            numberOfSelectedStar={course.rating}
            colorFilledStar="#ee6c4d"
            colorEmptyStar="#ccc"
            starSize="20px"
            spaceBetweenStar="2px"
            disableOnSelect={true}
          />
          <p className="info-card-price">{course.price} EUR</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
