import React, { useState, useEffect } from "react";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./TeacherPanel.css";
import TeacherCourseCard from "../TeacherCourseCard/TeacherCourseCard";
import AuthService from "../../../../auth/AuthService";

const TeacherPanel = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState("mycourses");

  //calling useEffect with different params every time curent course selection changes
  useEffect(() => {
    axios
      .get(
        `https://courses4me.herokuapp.com/users/${
          AuthService.getCurrentUser().username
        }/my-courses`,
        {
          headers: { authorization: AuthService.getAuthHeader() },
        }
      )
      .then(res => {
        console.log(res);
        setMyCourses(res.data);
      });
  }, []);

  const handleNavItemChanged = e => {
    setSelectedNavItem(e.target.id);
  };

  const renderProfileCourses = () => {
    return myCourses.map((course, index) => {
      return <TeacherCourseCard course={course} key={index} />;
    });
  };

  //default settings for slider (react-slick)
  var settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
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
          slidesToScroll: 1,
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

  return (
    <div className=" container profile-courses">
      <div className="profile-courses-nav">
        <ul>
          <li
            style={
              selectedNavItem === "mycourses"
                ? { color: "#ee6c4d", borderBottom: "#ee6c4d 1px solid" }
                : {}
            }
            onClick={handleNavItemChanged}
            className="profile-nav-item"
            id="mycourses"
          >
            My Courses
          </li>
          <li
            style={
              selectedNavItem === "public"
                ? { color: "#ee6c4d", borderBottom: "#ee6c4d 1px solid" }
                : {}
            }
            className="profile-nav-item disabled"
            id="public"
            onClick={handleNavItemChanged}
          >
            Public
          </li>
          <li
            style={
              selectedNavItem === "hidden"
                ? { color: "#ee6c4d", borderBottom: "#ee6c4d 1px solid" }
                : {}
            }
            className="profile-nav-item disabled"
            id="hidden"
            onClick={handleNavItemChanged}
          >
            Hidden
          </li>
        </ul>
      </div>
      <div className="profile-courses-display">
        <Slider {...settings}>{renderProfileCourses()}</Slider>
      </div>
    </div>
  );
};

export default TeacherPanel;
