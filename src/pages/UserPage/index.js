import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";

import AuthService from "../../auth/AuthService";
import "./index.css";
import StudentPanel from "./components/StudentPanel/StudentPanel";
import TeacherPanel from "./components/TeacherPanel/TeacherPanel";
import EditProfileModal from "./components/EditProfileModal/EditProfileModal";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

const messageKey = "uploading-image";

const UserPage = () => {
  const currentUser = AuthService.getCurrentUser();
  const formRef = React.createRef();
  const [imageEditModal, setImageEditModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const [profileImgUpdate, setProfileImgUpdate] = useState(null);

  const renderUserPanel = () => {
    if (currentUser.role_id === "student") {
      return <StudentPanel />;
    } else if (currentUser.role_id === "teacher") {
      return <TeacherPanel />;
    } else if (currentUser.role_id === "administrator") {
      return <div></div>;
    }
  };

  const showImageModal = () => {
    setImageEditModal(true);
  };

  const handleChangeProfileImage = e => {
    setProfileImgUpdate(e.target.files[0]);
  };

  const confirmImageModal = e => {
    setImageEditModal(false);
    message.loading({
      content: "Uploading Profile Picture...",
      key: messageKey,
    });
    const newProfilePic = new FormData();
    newProfilePic.append("picture", profileImgUpdate);
    axios
      .put(
        `https://courses4me.herokuapp.com/users/${currentUser.username}/pictureupload`,
        newProfilePic,
        {
          headers: {
            authorization: AuthService.getAuthHeader(),
            "Content-Type": "multipart/form-data",
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
            message.success({
              content: "Profile Picture Changed!",
              key: messageKey,
              duration: 2,
            });
            window.location.reload();
          });
      })
      .catch(err => {
        message.error({
          content: err.response.data.error,
          key: messageKey,
          duration: 2,
        });
      });
  };

  const confirmEditProfileModal = e => {
    const formValues = formRef.current.getFieldsValue();
    const dobMain = formValues.dateOfBirth
      ? formValues.dateOfBirth._d.toString().slice(4, 15)
      : currentUser.date_of_birth;
    const changeUserInfoData = {
      name: formValues.name,
      surname: formValues.surname,
      location: formValues.location,
      dateOfBirth: dobMain,
      phone: formValues.phone,
    };
    if (formValues.password === formValues.confirm) {
      console.log(formValues);
      if (formValues.oldPassword && formValues.password) {
        console.log("we are changing passwords");
        const changePassData = {
          oldPassword: formValues.oldPassword,
          newPassword: formValues.password,
        };

        console.log(formValues.password);
        const passwordChangeReq = axios
          .put(
            `https://courses4me.herokuapp.com/users/${currentUser.username}/password`,
            changePassData,
            {
              headers: {
                authorization: AuthService.getAuthHeader(),
              },
            }
          )
          .then(res => message.success("Password Successfully changed!"))
          .catch(err => {
            message.error(err.response.data.error);
          });
        const userInfoChangeReq = axios
          .put(
            `https://courses4me.herokuapp.com/users/${currentUser.username}`,
            changeUserInfoData,
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
                message.success("User Profile Updated!");
                // window.location.reload();
              });
          })
          .catch(err => message.error(err.response.data.error));

        axios.all([userInfoChangeReq, passwordChangeReq]).finally(res => {
          setEditProfileModal(false);
        });
        // .catch(errors => {
        //   let firstResponse =  errors[0];
        //   let secondResponse = errors[1];
        //   message.error()
        // })
      } else {
        axios
          .put(
            `https://courses4me.herokuapp.com/users/${currentUser.username}`,
            changeUserInfoData,
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
                message.success("User Profile Updated!");
                // window.location.reload();
                setEditProfileModal(false);
              });
          })
          .catch(err => message.error(err.response.data.error));
      }
    }
  };

  const cancelModal = e => {
    setImageEditModal(false);
    setEditProfileModal(false);
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
            <div className="edit-image-btn" onClick={showImageModal}>
              <EditOutlined />
            </div>
          </div>
          <Modal
            title="Update Profile Image"
            visible={imageEditModal}
            onOk={confirmImageModal}
            onCancel={cancelModal}
            className="edit-img-modal"
          >
            <input
              type="file"
              name="file"
              onChange={handleChangeProfileImage}
            />
          </Modal>

          <EditProfileModal
            formRef={formRef}
            editProfileModal={editProfileModal}
            setEditProfileModal={setEditProfileModal}
            onCreate={confirmEditProfileModal}
          />
          {/*proba 1*/}

          {/*proba 1*/}
          <div className="profile-about-user">
            <h3>
              {currentUser.name + " " + currentUser.surname}
              {"  "}
              <span>aka {currentUser.username}</span>
            </h3>
            <p className="profile-about-occupation">
              {currentUser.role_id === "administrator" ? (
                <i className="fas fa-user-cog" style={{ color: "#ee6c4d" }}></i>
              ) : currentUser.role_id === "teacher" ? (
                <i
                  className="fas fa-chalkboard-teacher"
                  style={{ color: "#ee6c4d" }}
                ></i>
              ) : (
                <i
                  className="fas fa-user-graduate"
                  style={{ color: "#ee6c4d" }}
                ></i>
              )}
              {"   " + currentUser.role_id}
            </p>
            <p className="profile-dob">
              <i className="fas fa-birthday-cake"></i>{" "}
              {currentUser.date_of_birth}
            </p>
            <p className="profile-location">
              <i className="fas fa-map-marker"></i> {currentUser.location}
            </p>
            <p>
              <i className="fas fa-phone"></i> {currentUser.phone}
            </p>
            <div className="profile-btn-section">
              <button
                className="btn edit-profile-btn"
                onClick={() => setEditProfileModal(true)}
              >
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
