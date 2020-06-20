import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentPanel.css";
import ProfileCourseCard from "../ProfileCourseCard/ProfileCourseCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AuthService from "../../../../auth/AuthService";

const StudentPanel = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState("allcourses");

  //calling useEffect with different params every time curent course selection changes
  useEffect(() => {
    axios
      .get(
        `https://courses4me.herokuapp.com/users/${
          AuthService.getCurrentUser().username
        }/courses`,
        {
          headers: { authorization: AuthService.getAuthHeader() },
        }
      )
      .then(res => {
        setMyCourses(res.data);
        console.log(res.data);
      });
  }, [selectedNavItem]);

  const handleNavItemChanged = e => {
    setSelectedNavItem(e.target.id);
  };

  const renderProfileCourses = () => {
    return myCourses.map(course => {
      return <ProfileCourseCard course={course} key={course.id} />;
    });
  };

  //default settings for slider (react-slick)
  var settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
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
              selectedNavItem === "allcourses"
                ? { color: "#ee6c4d", borderBottom: "#ee6c4d 1px solid" }
                : {}
            }
            onClick={handleNavItemChanged}
            className="profile-nav-item"
            id="allcourses"
          >
            All Courses
          </li>
          <li
            style={
              selectedNavItem === "wishlist"
                ? { color: "#ee6c4d", borderBottom: "#ee6c4d 1px solid" }
                : {}
            }
            className="profile-nav-item disabled"
            id="wishlist"
            onClick={handleNavItemChanged}
          >
            WishList
          </li>
          <li
            style={
              selectedNavItem === "archived"
                ? { color: "#ee6c4d", borderBottom: "#ee6c4d 1px solid" }
                : {}
            }
            className="profile-nav-item disabled"
            id="archived"
            onClick={handleNavItemChanged}
          >
            Archived
          </li>
        </ul>
      </div>
      <div className="profile-courses-display">
        <Slider {...settings}>{renderProfileCourses()}</Slider>
      </div>
    </div>
  );
};

export default StudentPanel;
