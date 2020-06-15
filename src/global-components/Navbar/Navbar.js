import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ toggleModal, currentUser, handleLogout }) => {
  const [searchState, setSearchState] = useState("");

  const handleInputChange = e => {
    setSearchState(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log(searchState);
  };

  // const antdMenu = (
  //   <Menu>
  //     <Menu.Item>
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.alipay.com/"
  //       >
  //         1st menu item
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.taobao.com/"
  //       >
  //         2nd menu item
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.tmall.com/"
  //       >
  //         3rd menu item
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item danger>a danger item</Menu.Item>
  //   </Menu>
  // );
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
