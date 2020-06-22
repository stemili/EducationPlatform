import React from "react";
import { Input, Form, message } from "antd";
import { useState } from "react";
import "./Signup.css";
import AuthService from "../../auth/AuthService";
import axios from "axios";

const Signup = ({ setModalWin }) => {
  const formRef = React.createRef();
  const formRefSecond = React.createRef();
  const [userRole, setUserRole] = useState("student");
  const [createLvl, setCreateLvl] = useState(0);
  const [userData, setUserData] = useState({});
  const handleInputChange = e => {
    setUserRole(e.target.id);
  };

  const onFinish = values => {
    // console.log(values);
    // const coverPhoto = await toBase64(values.upload[0].originFileObj);
    const createUser = {
      username: values.username,
      password: values.password,
      email: values.email,
      role_id: userRole,
      name: values.name,
      surname: values.surname,
    };

    AuthService.register(createUser)
      .then(res => {
        if (res.status === 200) {
          setUserData(createUser);
          setCreateLvl(1);
        }
      })
      .catch(err => message.error(err.response.data.error));
  };

  const onFinishSecond = values => {
    const confirmProfile = {
      register_token: values.confirmationCode,
    };
    axios
      .post("https://courses4me.herokuapp.com/verify", confirmProfile)
      .then(res => setCreateLvl(2));
    console.log(confirmProfile);
  };

  return (
    <div
      className={
        createLvl === 0
          ? "signup-form-main-outer"
          : "signup-form-main-outer-second"
      }
    >
      {createLvl === 0 ? (
        <React.Fragment>
          <h4>
            Create <span>Account</span>
          </h4>
          <Form
            layout="vertical"
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            className="signup-form-main"
          >
            <Form.Item
              name="name"
              // label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="surname"
              // label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name!",
                },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              name="email"
              // label="Email address"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address!",
                },
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>
            <Form.Item
              name="username"
              // label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              // label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              // label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <div className="signup-field radio">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  onChange={handleInputChange}
                  id="student"
                />
                <label
                  htmlFor="student"
                  className={userRole === "student" ? "active-orange" : ""}
                >
                  Student
                </label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  onChange={handleInputChange}
                  id="teacher"
                />
                <label
                  htmlFor="teacher"
                  className={userRole === "teacher" ? "active-orange" : ""}
                >
                  Teacher
                </label>
              </div>
            </Form.Item>

            <Form.Item>
              <button className="btn create-c-btn" htmltype="submit">
                Create Account
              </button>
            </Form.Item>
          </Form>
        </React.Fragment>
      ) : createLvl === 1 ? (
        <React.Fragment>
          <h4>
            Hi, <span>{userData.username}</span>!
          </h4>
          <p>
            We're excited to have you get started. First, you need to confirm
            your account. Just type the code we have sent you on{" "}
            <span>{userData.email}</span>
          </p>
          <Form
            layout="vertical"
            ref={formRefSecond}
            onFinish={onFinishSecond}
            className="signup-form-main"
          >
            <Form.Item
              name="confirmationCode"
              rules={[
                {
                  required: true,
                  message: "Please enter your confirmation code!",
                },
              ]}
            >
              <Input
                className="confirm-token-signup"
                placeholder="Enter here your confirmation code"
              />
            </Form.Item>
            <Form.Item>
              <button className="btn create-c-btn" htmltype="submit">
                Confirm
              </button>
            </Form.Item>
          </Form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png"
            alt="tick"
            className="image-signup-tick"
          />
          <p className="success-p-mess">
            Your Profile has been Successfully Created!
          </p>
          <button
            className="btn proceed-login"
            onClick={() => setModalWin([true, "login"])}
          >
            Proceed to Login
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Signup;
