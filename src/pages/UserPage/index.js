import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../../auth/AuthService";
import "./index.css";
import StudentPanel from "./components/StudentPanel/StudentPanel";
import TeacherPanel from "./components/TeacherPanel/TeacherPanel";

const UserPage = () => {
  const currentUser = AuthService.getCurrentUser();

  const renderUserPanel = () => {
    if (currentUser.role_id === "student") {
      return <StudentPanel />;
    } else if (currentUser.role_id === "teacher") {
      return <TeacherPanel />;
    } else if (currentUser.role_id === "administrator") {
      return (
        <div>
          <h1>ADMINISTRATOR</h1>
        </div>
      );
    }
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
              ) : currentUser.role_id === "teacher" ? (
                <Link to="/createcourse">
                  <button className="dashboard-profile-btn">
                    Create Course
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {renderUserPanel()}
    </div>
  );
};
export default UserPage;
