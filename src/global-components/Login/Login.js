import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";

import AuthService from "../../auth/AuthService";
const Login = ({ setCurrentUser, setModalWin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = e => {
    e.preventDefault();
    AuthService.login(username, password).then(([username, API_URL]) => {
      axios.get(`${API_URL}/users/${username}`).then(res => {
        localStorage.setItem("user-info", JSON.stringify(res.data[0]));
        setCurrentUser(AuthService.getCurrentUser());
        setModalWin([false, "login"]);
      });
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
          <input className="login-submit" type="submit" value="Log In" />
          <p>Forgot Password?</p>
        </form>
      </div>
      <div className="login-bottom-external">
        <button>
          <i className="fab fa-google"></i>Continue with Google
        </button>
        <button>
          <i className="fab fa-facebook-f"></i>Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
