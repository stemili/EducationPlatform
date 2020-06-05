import React from "react";
import ReactStarRating from "react-star-ratings-component";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="thumbnail-card">
        <img src={course.thumbnail} alt="Thumbnail" />
        <p className="thumbnail-category">{course.category.toUpperCase()}</p>
      </div>

      <div className="info-card">
        <div className="card-top-info">
          <h3>{course.title}</h3>
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
            disableOnSelect={false}
            onSelectStar={val => {
              console.log(val);
            }}
          />
          <p className="info-card-price">1999$</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
