import React from "react";
import Modal from "react-modal";
import Signup from "../Signup/Signup";
import "./ModalAuth.css";
import logo from "../../resources/logo.png";

Modal.setAppElement("#root");

const ModalAuth = ({ modalOpen, type, setModalWin }) => {
  const modalContent =
    type === "login" ? (
      <div>
        <h3>Log In</h3>
        <input type="text" />
        <input type="submit" />
      </div>
    ) : (
      <Signup />
    );
  return (
    <Modal
      isOpen={modalOpen}
      ariaHideApp={false}
      onRequestClose={() => setModalWin([false, null])}
      style={{
        overlay: {
          backgroundColor: "#293241cc",
        },
        content: {
          width: "60%",
          height: "70%",
          margin: "auto",
          padding: 0,
          border: "none",
          overflow: "hidden",
          borderRadius: "1.5rem",
        },
      }}
    >
      <div className="modal-container">
        <div className="modal-left">
          <div className="modal-left-pic"></div>
          <div className="modal-left-title">
            <img src={logo} alt="" />
            <h3>Discite</h3>
            <p>“An investment in knowledge pays the best interest.”</p>
          </div>
        </div>

        <div className="modal-right-content">
          <p
            className="modal-close-btn"
            onClick={() => setModalWin([false, null])}
          >
            X
          </p>
          {modalContent}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAuth;
