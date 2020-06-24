import React from "react";
import { Modal, Form, Input, DatePicker } from "antd";
import AuthService from "../../../../auth/AuthService";
import "./EditProfileModal.css";
import moment from "moment";

const EditProfileModal = ({
  editProfileModal,
  setEditProfileModal,
  onCreate,
  formRef,
}) => {
  //   useEffect(() => {
  //     if (formRef.current) {
  //       console.log(formRef.current);
  //       formRef.current.setFieldsValue({
  //         name: AuthService.getCurrentUser().name,
  //         surname: AuthService.getCurrentUser().surname,
  //         location: AuthService.getCurrentUser().location,
  //         dateOfBirth: AuthService.getCurrentUser().date_of_birth,
  //         phone: AuthService.getCurrentUser().phone,
  //       });
  //     }
  //   }, []);
  const currentUser = AuthService.getCurrentUser();
  return (
    <Modal
      title="Edit Profile"
      visible={editProfileModal}
      onOk={onCreate}
      onCancel={() => setEditProfileModal(false)}
      className="edit-img-modal"
      okText="Save Changes"
    >
      <Form
        layout="vertical"
        ref={formRef}
        initialValues={{
          name: currentUser.name,
          surname: currentUser.surname,
          location: currentUser.location,
          phone: currentUser.phone,
          dateOfBirth: currentUser.date_of_birth
            ? moment(currentUser.date_of_birth)
            : moment(Date.now()),
        }}
      >
        <Form.Item
          name="name"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="surname"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Phone number" name="phone">
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input placeholder="Country/City" />
        </Form.Item>
        <Form.Item label="Date of Birth" name="dateOfBirth">
          <DatePicker />
        </Form.Item>
        <p className="edit-profile-change-pass">Change Password</p>
        <Form.Item name="oldPassword">
          <Input.Password placeholder="Current Password" />
        </Form.Item>
        <Form.Item name="password" label="New Password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          // label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
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
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
