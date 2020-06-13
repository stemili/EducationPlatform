import React from "react";
import ReactStarRating from "react-star-ratings-component";
import "./CourseCard.css";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="thumbnail-card">
        <img src={course.thumbnail} alt="Thumbnail" />
        <p className="thumbnail-category">{course.category.toUpperCase()}</p>
      </div>

      <div className="info-card">
        <div className="card-top-info">
          <Link to={`/course/${course.id}`}>
            <h3>{course.title}</h3>
          </Link>
          <p>{course.description}</p>
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
          <p className="info-card-price">1999$</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
