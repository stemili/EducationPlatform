import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ toggleModal }) => {
  const [searchState, setSearchState] = useState("");

  const handleInputChange = e => {
    setSearchState(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log(searchState);
  };
  return (
    <div className="main-nav">
      <div className="container-nav">
        <div className="main-nav-left">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/resources/text_logo.png"}
              alt=""
            />
          </Link>
        </div>
        <div className="main-nav-mid">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="What do you want to learn?"
              onChange={handleInputChange}
            />
          </form>
        </div>
        <nav className="main-nav-right">
          <nav className="main-nav-right-content">
            <li onClick={() => toggleModal(true, "login")}>Log in</li>
            <li onClick={() => toggleModal(true, "signup")}>Sign up</li>
          </nav>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
