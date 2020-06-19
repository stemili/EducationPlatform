import React from "react";
import "./Footer.css";
import FooterList from "../FooterList/FooterList";

export default class Footer extends React.Component {
  render() {
    return (
      <footer style={this.props.dashboard ? { display: "none" } : {}}>
        <div className="footer-wrapper">
          <div className="footer-upper">
            <div className="footer-menu">
              <FooterList items={["Teach", "Bussiness", "App", "About Us"]} />
            </div>
            <div className="footer-menu">
              <FooterList
                items={["Careers", "Blog", "Help and Support", "Affiliate"]}
              />
            </div>
            <div className="footer-menu">
              <FooterList
                items={["Terms", "Privacy policy", "Sitemap", "Cookie policy"]}
              />
            </div>
          </div>
          <hr />
          <div className="footer-bottom">
            <img
              src={process.env.PUBLIC_URL + "/resources/logo.png"}
              alt="Logo"
            />
            <span>
              Discite <sup>&copy;</sup> All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    );
  }
}
