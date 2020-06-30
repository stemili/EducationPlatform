import React from "react";
import "./CoursesTable.css";
import { Table, Space, Button, message } from "antd";
import AuthService from "../../../../auth/AuthService";
import apiCall from "../../../../service/apiCall";

const CoursesTable = ({ itemData }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) =>
        a.category.toLowerCase() > b.category.toLowerCase() ? -1 : 1,
    },
    {
      title: "Date Created",
      dataIndex: "created",
      key: "created",
      sorter: (a, b) =>
        a.created.toLowerCase() > b.created.toLowerCase() ? -1 : 1,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => (a.price > b.price ? -1 : 1),
    },
    {
      title: "Course Author",
      dataIndex: "teacher",
      key: "teacher",
      sorter: (a, b) => (a.teacher > b.teacher ? -1 : 1),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => deleteCourse(record.id)}>Delete Course</Button>
        </Space>
      ),
    },
  ];

  const deleteCourse = deleteId => {
    apiCall
      .delete(`/courses/${deleteId}`, {
        headers: {
          authorization: AuthService.getAuthHeader(),
        },
      })
      .then(res => {
        message.success("Course Deleted!");
        // window.location.reload();
      })
      .catch(err => {
        message.error("Failed To Delete Course");
      });
  };
  let passedData = [];
  // Adding key prop for Ant D
  if (itemData) {
    passedData = itemData.map(course => {
      course.key = course.id;
      return course;
    });
  }
  return (
    <div>
      <Table dataSource={passedData} columns={columns} />
    </div>
  );
};

export default CoursesTable;
