import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "../CourseCard/CourseCard";
import "./CoursesDisplay.css";

const CoursesDisplay = props => {
  //settings for react-slick slider
  var settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [topCourses, setTopCourses] = useState([]);
  useEffect(() => {
    fetch(
      "https://jsonblob.com/api/jsonBlob/c6531116-a6b7-11ea-a03a-47b0abf3623a"
    )
      .then(res => res.json())
      .then(data => {
        setTopCourses(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="courses-display container">
      <Slider {...settings}>
        {topCourses.courses
          ? topCourses.courses.map(course => <CourseCard course={course} />)
          : ""}
      </Slider>
    </div>
  );
};

export default CoursesDisplay;
