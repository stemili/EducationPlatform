import React from "react";
import "./Signup.css";

class Signup extends React.Component {
  state = { firstName: "", lastName: "", eMail: "", password: "" };
  handleInputChange = (e) => {
    return e.target.name === "firstName"
      ? this.setState({ firstName: e.target.value })
      : e.target.name === "lastName"
      ? this.setState({ lastName: e.target.value })
      : e.target.name === "eMail"
      ? this.setState({ eMail: e.target.value })
      : e.target.name === "password"
      ? this.setState({ password: e.target.value })
      : "";
  };
  handleSignupClick = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    console.log("render");
    return (
      <div className="content-wrapper">
        <div className="external-signup">
          <button className="ui facebook button">
            <i className="facebook icon"></i>
            Connect with Facebook
          </button>
          <button className="ui google plus button">
            <i className="google plus icon"></i>
            Connect with Google
          </button>
        </div>
        <form className="ui small form inverted">
          <div className="required field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="required field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="required field">
            <label>E-Mail address</label>
            <input
              type="email"
              name="eMail"
              placeholder="user@random.com"
              value={this.state.eMail}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="required field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Must contain 1 Uppercase and 1 Number"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="field">
            <div className="ui checkbox">
              <input type="checkbox" />
              <label>I agree to the Terms and Conditions</label>
            </div>
          </div>
          <button
            className="ui button orange"
            type="submit"
            id="submit-button"
            onClick={this.handleSignupClick}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
