import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import DropdownList from "./DropdownList";
import SearchBar from "./SearchBar";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Navbar = ({ toggleModal, currentUser, handleLogout, dashboard }) => {
  const [dropDownValue, setDropDownValue] = useState("all");

  const antdMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/userprofile">
          <p className="nav-drop-item-l">My Profile</p>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <p className="nav-drop-item-l">Log Out</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={dashboard ? "main-nav main-nav-dash" : "main-nav"}>
      <div className={dashboard ? "container-nav-dash" : "container-nav"}>
        <div className="main-nav-left">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/resources/text_logo.png"}
              alt=""
            />
          </Link>
        </div>
        {dashboard ? (
          ""
        ) : (
          <div className="main-nav-mid">
            <DropdownList setDropDownValue={setDropDownValue} />
            <SearchBar dropdownValue={dropDownValue} />
          </div>
        )}

        <nav className="main-nav-right">
          <nav className="main-nav-right-content">
            {currentUser ? (
              <React.Fragment>
                <div
                  className={
                    dashboard
                      ? "nav-user-info nav-user-dashboard"
                      : "nav-user-info"
                  }
                >
                  <Link to="/userprofile">
                    <img
                      className="nav-avatar"
                      src="https://www.nj.com/resizer/h8MrN0-Nw5dB5FOmMVGMmfVKFJo=/450x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
                      alt="useravatar"
                    />
                  </Link>

                  <Dropdown overlay={antdMenu} placement="bottomRight">
                    <span className="ant-dropdown-link drop">
                      {currentUser.username} <DownOutlined />
                    </span>
                  </Dropdown>
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
