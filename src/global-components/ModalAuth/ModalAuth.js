import React from "react";
import Modal from "react-modal";
import Signup from "../Signup/Signup";
import "./ModalAuth.css";
import Login from "../Login/Login";

Modal.setAppElement("#root");

const ModalAuth = ({ modalOpen, type, setModalWin, setCurrentUser }) => {
  let modalContent =
    type === "login" ? (
      <Login setCurrentUser={setCurrentUser} setModalWin={setModalWin} />
    ) : (
      <Signup setModalWin={setModalWin} />
    );
  return (
    <Modal
      isOpen={modalOpen}
      ariaHideApp={false}
      onRequestClose={() => setModalWin([false, type])}
      closeTimeoutMS={400}
      style={{
        overlay: {
          backgroundColor: "#293241cc",
        },
        content: {
          height: "90%",
          padding: 0,
          border: "none",
          overflow: "hidden",
          borderRadius: "1rem",
          backgroundColor: "transparent",
        },
      }}
      className="modal-main"
    >
      <div className="modal-container">
        <div className="modal-left">
          <div className="modal-left-pic"></div>
          <div className="modal-left-title">
            <img src={process.env.PUBLIC_URL + "/resources/logo.png"} alt="" />
            <h3>Discite</h3>
          </div>
        </div>

        <div className="modal-right-content">
          <p
            className="modal-close-btn"
            onClick={() => setModalWin([false, type])}
          >
            <i className="fas fa-times"></i>
          </p>
          {modalContent}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAuth;
