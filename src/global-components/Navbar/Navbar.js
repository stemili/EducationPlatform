import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import DropdownList from "./DropdownList";
import SearchBar from "./SearchBar";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = ({
  toggleModal,
  currentUser,
  handleLogout,
  dashboard,
  selectedCategory,
  setSelectedCategory,
  focusSearch,
  setFocusSearch,
}) => {
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
  const [menuOpen, setMenuOpen] = useState(null);
  useEffect(() => {
    if (window.innerWidth > 990) {
      setMenuOpen(true);
    } else if (window.innerWidth > 650) {
      setMenuOpen(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 990) {
        setMenuOpen(true);
      } else if (window.innerWidth > 650) {
        setMenuOpen(false);
      }
    });
  }, []);
  const menuBtnRef = React.useRef();
  return (
    <React.Fragment>
      <div className="mobile-left-logo">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/resources/logo-light.png"}
            alt=""
          />
        </Link>
      </div>
      <div
        ref={menuBtnRef}
        className={menuOpen ? "menu-btn-resp open" : "menu-btn-resp"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="menu-burger-btn"></div>
      </div>
      <div
        className={dashboard ? "main-nav main-nav-dash" : "main-nav"}
        style={
          menuOpen
            ? { transform: "translateX(0%)" }
            : { transform: "translateX(-100%)" }
        }
      >
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
              <DropdownList
                setDropDownValue={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
              <SearchBar
                dropdownValue={selectedCategory}
                focusSearch={focusSearch}
                setFocusSearch={setFocusSearch}
              />
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
                        src={
                          currentUser.picture
                            ? currentUser.picture
                            : "https://www.in-tend.co.uk/images/default.jpg"
                        }
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
    </React.Fragment>
  );
};

export default Navbar;
