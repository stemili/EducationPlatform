import React from "react";
import "./UsersTable.css";

import { Table, Space, Button, message } from "antd";
import axios from "axios";
import AuthService from "../../../../auth/AuthService";

const UsersTable = ({ itemData }) => {
  let passedData = [];

  const deleteUser = deleteId => {
    axios
      .delete(`https://courses4me.herokuapp.com/users/${deleteId}`, {
        headers: {
          authorization: AuthService.getAuthHeader(),
        },
      })
      .then(res => {
        message.success("User Deleted!");
        // window.location.reload();
      })
      .catch(err => {
        message.error("Failed To Delete User");
      });
  };

  const handlePruneButton = () => {
    axios
      .delete("https://courses4me.herokuapp.com/users/prune", {
        headers: {
          authorization: AuthService.getAuthHeader(),
        },
      })
      .then(res => {
        message.success("Unverified Users Deleted!");
        // window.location.reload();
      })
      .catch(err => {
        message.error("Failed To Delete Users");
      });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) =>
        a.username.toLowerCase() > b.username.toLowerCase() ? -1 : 1,
    },
    {
      title: "First Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Last Name",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      defaultSortOrder: "descend",
      sorter: (a, b) => (a.role_id > b.role_id ? -1 : 1),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => deleteUser(record.username)}>
            Delete User
          </Button>
        </Space>
      ),
    },
  ];

  // Adding key prop for Ant D
  if (itemData) {
    passedData = itemData.map(user => {
      user.key = user.username;
      return user;
    });
  }

  return (
    <div>
      <Button
        type="primary"
        danger
        className="prune-delete"
        onClick={handlePruneButton}
      >
        Remove Unverified Accounts
      </Button>
      <Table dataSource={passedData} columns={columns} />
    </div>
  );
};

export default UsersTable;
