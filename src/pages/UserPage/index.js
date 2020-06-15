import React, { useEffect, useState } from "react";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthService from "../../auth/AuthService";
import ProfileCourseCard from "./components/ProfileCourseCard/ProfileCourseCard";
import "./index.css";
import { Link } from "react-router-dom";

const UserPage = props => {
  const currentUser = AuthService.getCurrentUser();
  const [myCourses, setMyCourses] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useState("allcourses");

  //calling useEffect with different params every time curent course selection changes
  useEffect(() => {
    axios
      .get(
        "https://jsonblob.com/api/jsonBlob/c6531116-a6b7-11ea-a03a-47b0abf3623a"
      )
      .then(res => setMyCourses(res.data.courses));
  }, [selectedNavItem]);

  const handleNavItemChanged = e => {
    setSelectedNavItem(e.target.id);
  };

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

  const renderProfileCourses = () => {
    return myCourses.map(course => {
      return <ProfileCourseCard course={course} key={course.id} />;
    });
  };

  return (
    <div className="user-page">
      <div className="profile-user-back">
        <div className="container profile-user-info">
          <img
            src="https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
            alt="avatar"
          />
          <div className="profile-about-user">
            <h3>
              {currentUser.name + " " + currentUser.surname}
              {"  "}
              <span>aka {currentUser.username}</span>
            </h3>
            <p className="profile-about-occupation">
              {currentUser.role_id === "administrator" ? (
                <i className="fas fa-user-cog" style={{ color: "#ee6c4d" }}></i>
              ) : (
                ""
              )}
              {"   " + currentUser.role_id}
            </p>
            <p className="profile-dob">D.O.B. 12/12/2012 (static)</p>
            <p className="profile-location">
              <i className="fas fa-map-marker"></i> Podgorica (static)
            </p>
            <div className="profile-btn-section">
              <button className="btn edit-profile-btn disabled">
                Edit Profile
              </button>
              {currentUser.role_id === "administrator" ? (
                <Link to="/dashboard">
                  <button className="dashboard-profile-btn">Dashboard</button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};
export default UserPage;
