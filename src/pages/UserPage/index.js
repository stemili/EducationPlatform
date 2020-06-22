import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Input } from "antd";

import AuthService from "../../auth/AuthService";
import "./index.css";
import StudentPanel from "./components/StudentPanel/StudentPanel";
import TeacherPanel from "./components/TeacherPanel/TeacherPanel";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

const UserPage = () => {
  const currentUser = AuthService.getCurrentUser();

  const [editModal, setEditModal] = useState(false);
  const [imgUrlUpdate, setImgUrlUpdate] = useState("");
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

  const showModal = () => {
    setEditModal(true);
  };

  const confirmModal = e => {
    setEditModal(false);
    axios
      .put(
        `https://courses4me.herokuapp.com/users/${
          AuthService.getCurrentUser().username
        }/picture`,
        { picture: imgUrlUpdate },
        {
          headers: {
            authorization: AuthService.getAuthHeader(),
          },
        }
      )
      .then(res => {
        axios
          .get(
            `https://courses4me.herokuapp.com/users/${
              AuthService.getCurrentUser().username
            }`
          )
          .then(res => {
            console.log(res.data[0]);
            localStorage.setItem("user-info", JSON.stringify(res.data[0]));
            window.location.reload();
          });
      });
  };

  const cancelModal = e => {
    setEditModal(false);
  };

  const handleImgUrlChange = e => {
    setImgUrlUpdate(e.target.value);
  };

  return (
    <div className="user-page">
      <div className="profile-user-back">
        <div className="container profile-user-info">
          <div className="profile-user-image-section">
            <img
              src={
                currentUser.picture
                  ? currentUser.picture
                  : "https://www.in-tend.co.uk/images/default.jpg"
              }
              alt="avatar"
            />
            <div className="edit-image-btn" onClick={showModal}>
              <EditOutlined />
            </div>
          </div>
          <Modal
            title="Update Profile Image"
            visible={editModal}
            onOk={confirmModal}
            onCancel={cancelModal}
            className="edit-img-modal"
          >
            <Input value={imgUrlUpdate} onChange={handleImgUrlChange}></Input>
          </Modal>
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
