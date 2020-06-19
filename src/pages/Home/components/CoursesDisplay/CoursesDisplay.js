import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "../CourseCard/CourseCard";
import "./CoursesDisplay.css";

const CoursesDisplay = props => {
  const [topCourses, setTopCourses] = useState([]);
  useEffect(() => {
    axios
      .get("https://courses4me.herokuapp.com/courses")
      .then(res => setTopCourses(res.data));
  }, []);
  //settings for react-slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1102,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 831,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const renderCourses = () => {
    return topCourses.map((course, index) => {
      return <CourseCard course={course} key={index} />;
    });
  };

  return (
    <div className="courses-display container">
      <h3>May Specials</h3>
      <Slider {...settings}>{renderCourses()}</Slider>
    </div>
  );
};

export default CoursesDisplay;
