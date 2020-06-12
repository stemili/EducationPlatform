import React from "react";
import "./Signup.css";

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    eMail: "",
    password: "",
    passwordCopy: "",
    role: "student",
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
        <div className="error-message">
          <div className="header">Terms and Conditions</div>
          <p>Please accept Terms and Conditions!</p>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="content-wrapper">
        <h1>Sign up</h1>
        <div className="external-signup">
          <button className="signup-button fb">
            <i className="fab fa-facebook"></i>
            Connect with Facebook
          </button>
          <button className="signup-button google">
            <i className="fab fa-google"></i>
            Connect with Google
          </button>
        </div>
        <form className="signup-form">
          <div className="signup-field">
            <span>First Name</span>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="signup-field">
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              placeholder="Wick"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="signup-field">
            <span>E-Mail address</span>
            <input
              type="email"
              name="eMail"
              placeholder="user@random.com"
              value={this.state.eMail}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="signup-field">
            <span htmlFor="password">Password</span>
            <input
              type="password"
              name="password"
              placeholder="password123"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="signup-field">
            <span htmlFor="password">Re-type password</span>
            <input
              type="password"
              name="passwordCopy"
              placeholder="password123"
              value={this.state.passwordCopy}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="signup-field radio">
            <span>Select your role</span>
            <input
              type="radio"
              name="role"
              value="student"
              onChange={this.handleInputChange}
              id="student"
            />
            <label
              htmlFor="student"
              className={this.state.role === "student" ? "active-orange" : ""}
            >
              Student
            </label>
            <input
              type="radio"
              name="role"
              value="teacher"
              onChange={this.handleInputChange}
              id="teacher"
            />
            <label
              htmlFor="teacher"
              className={this.state.role === "teacher" ? "active-orange" : ""}
            >
              Teacher
            </label>
          </div>
          <div className="signup-field">
            <input
              type="checkbox"
              name="terms"
              onChange={this.handleInputChange}
            />
            <label> I agree to the Terms and Conditions</label>
          </div>
          <button
            className="signup-button"
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
