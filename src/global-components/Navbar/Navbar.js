import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import DropdownList from "./DropdownList";
import SearchBar from "./SearchBar";

const Navbar = ({ toggleModal, currentUser, handleLogout }) => {
  const [searchState, setSearchState] = useState("");
  const [dropDownValue, setDropDownValue] = useState("");

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
          <DropdownList setDropDownValue={setDropDownValue} />
          <SearchBar setSearchState={setSearchState} />
        </div>
        <nav className="main-nav-right">
          <nav className="main-nav-right-content">
            {currentUser ? (
              <React.Fragment>
                <div className="nav-user-info">
                  <button className="logout" onClick={handleLogout}>
                    Log Out
                  </button>
                  <Link to="/userprofile">My Profile</Link>
                  {/* <Dropdown overlay={antdMenu}>
                    <a
                      className="ant-dropdown-link"
                      onClick={e => e.preventDefault()}
                    >
                      Hover me <DownOutlined />
                    </a>
                  </Dropdown> */}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li onClick={() => toggleModal(true, "login")}>Log in</li>
                <li onClick={() => toggleModal(true, "signup")}>Sign up</li>
              </React.Fragment>
            )}
          </nav>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
