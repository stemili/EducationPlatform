import React from "react";
import "./Signup.css";

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    eMail: "",
    password: "",
    passwordCopy: "",
    role: "",
    terms: false,
    errors: false,
  };
  handleInputChange = (e) => {
    return e.target.name === "firstName"
      ? this.setState({ firstName: e.target.value })
      : e.target.name === "lastName"
      ? this.setState({ lastName: e.target.value })
      : e.target.name === "eMail"
      ? this.setState({ eMail: e.target.value })
      : e.target.name === "password"
      ? this.setState({ password: e.target.value })
      : e.target.name === "passwordCopy"
      ? this.setState({ passwordCopy: e.target.value })
      : e.target.name === "role"
      ? this.setState({ role: e.target.value })
      : e.target.type === "checkbox"
      ? this.setState({ terms: e.target.checked })
      : "";
  };
  handleSignupClick = (e) => {
    e.preventDefault();
    const checkTerms = this.doValidation(this.state);
    if (checkTerms === false) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });
    }
  };

  doValidation = (s) => {
    if (s.terms === false) {
      return false;
    }
  };

  checkErrors = () => {
    if (this.state.errors === true) {
      return (
        <div className="ui error message">
          <div className="header">Terms and Conditions</div>
          <p>Please accept Terms and Conditions!</p>
        </div>
      );
    }
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
        <form className="ui form inverted">
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
              placeholder="include at least 1 number"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="required field">
            <label htmlFor="password">Re-type password</label>
            <input
              type="password"
              name="passwordCopy"
              placeholder="Re-type your password"
              value={this.state.passwordCopy}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Select your role</label>
            <div className="ui radio checkbox">
              <input
                type="radio"
                name="role"
                value="student"
                onChange={this.handleInputChange}
              />
              <label>Student</label>
            </div>
            <div className="ui radio checkbox">
              <input
                type="radio"
                name="role"
                value="teacher"
                onChange={this.handleInputChange}
              />
              <label>Teacher</label>
            </div>
          </div>
          <div className="field">
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="terms"
                onChange={this.handleInputChange}
              />
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
        {this.checkErrors()}
      </div>
    );
  }
}

export default Signup;
