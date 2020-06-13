import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = e => {
    e.preventDefault();
    console.log(username, password);
    const loginDetails = {
      username,
      password,
    };
    axios.post("https://courses4me.herokuapp.com/login", loginDetails, {
      headers: {
        "content-Type": "application/json",
        "cache-control": "no-cache",
      },
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
