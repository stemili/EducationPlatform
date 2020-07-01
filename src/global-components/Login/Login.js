import React from "react";
import "./Login.css";
import { useState } from "react";
import apiCall from "../../service/apiCall";

import AuthService from "../../auth/AuthService";
import { useHistory } from "react-router-dom";
import { message } from "antd";
const Login = ({ setCurrentUser, setModalWin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogIn = e => {
    e.preventDefault();
    AuthService.login(username, password)
      .then(username => {
        apiCall.get(`/users/${username}`).then(res => {
          localStorage.setItem("user-info", JSON.stringify(res.data[0]));
          setCurrentUser(AuthService.getCurrentUser());
          setModalWin([false, "login"]);
          history.push("/userprofile");
        });
      })
      .catch(err => {
        console.log(err.response.data);
        message.error(err.response.data.error);
      });
  };

  const handleInputChange = e => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <div className="login-form">
      <div className="login-top-regular">
        <h3>
          Welcome <span>Back</span>
        </h3>
        <p>Log in to continue</p>
        <form onSubmit={handleLogIn}>
          <input
            className="login-username"
            type="text"
            required
            placeholder="Username"
            id="username"
            value={username}
            onChange={handleInputChange}
          />
          <input
            className="login-password"
            type="password"
            required
            placeholder="Password"
            id="password"
            value={password}
            onChange={handleInputChange}
          />
          <button className="login-submit btn" type="submit">
            Log In
          </button>
        </form>
      </div>
      <div className="login-bottom-external">
        <button className="disabled">
          <i className="fab fa-google"></i>
        </button>
        <button className="disabled">
          <i className="fab fa-facebook-f"></i>
        </button>
      </div>
      <p className="bottom-down-login">
        Not a member?{" "}
        <span onClick={() => setModalWin([true, "signup"])}>Sign up now!</span>
      </p>
    </div>
  );
};

export default Login;
