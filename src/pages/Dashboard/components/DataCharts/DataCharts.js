import React from "react";
import "./DataCharts.css";
import { Line, Pie } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const DataChards = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [createdCourses, setCreatedCourses] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [newUsers, setNewUsers] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [verUnver, setVerUnver] = useState({
    "Verified Users": 5,
    "Unverified Users": 1,
  });

  const coursesData = {
    labels: [
      "6 Days Ago",
      "5 Days Ago",
      "4 Days Ago",
      "3 Days Ago",
      "2 Days Ago",
      "Yesterday",
      "Today",
    ],
    datasets: [
      {
        label: "Courses",
        data: [...createdCourses],
        backgroundColor: ["rgba(41, 50, 65, 0.9)"],
      },
    ],
  };
  const usersData = {
    labels: [
      "6 Days Ago",
      "5 Days Ago",
      "4 Days Ago",
      "3 Days Ago",
      "2 Days Ago",
      "Yesterday",
      "Today",
    ],
    datasets: [
      {
        label: "Users",
        data: [...newUsers],
        backgroundColor: ["rgba(238, 108, 77, 0.9)"],
      },
    ],
  };

  const teacherStudentData = {
    labels: ["Students", "Teachers"],
    datasets: [
      {
        label: "Student/Teacher Ratio",
        data: [studentCount, teacherCount],
        backgroundColor: ["rgba(238, 108, 77, 0.9)", "rgba(78, 163, 154, 0.9)"],
      },
    ],
  };
  const verUnVerAccounts = {
    labels: ["Verified", "Unverified"],
    datasets: [
      {
        label: "Verified/Unverified Ratio",
        data: [verUnver["Verified users"], verUnver["Unverified users"]],
        backgroundColor: ["rgba(78, 163, 154, 0.9)", "rgba(41, 50, 65, 0.9)"],
      },
    ],
  };

  useEffect(() => {
    axios
      .get("https://courses4me.herokuapp.com/users/teachers-count")
      .then(res => setTeacherCount(res.data));
    axios
      .get("https://courses4me.herokuapp.com/users/students-count")
      .then(res => setStudentCount(res.data));
    /*future fix */
    // if (false) {
    axios
      .get(
        "https://courses4me.herokuapp.com/users/statistics/new-teachers-number"
      )
      .then(res => setNewUsers(res.data.data));
    axios
      .get(
        "https://courses4me.herokuapp.com/courses/statistics/new-courses-number"
      )
      .then(res => setCreatedCourses(res.data.data));
    axios
      .get("https://courses4me.herokuapp.com/users/enabled-disabled")
      .then(res => setVerUnver(res.data));
  }, []);
  return (
    <div className="data-charts-main">
      <div className="charts-top">
        <Line
          data={usersData}
          options={{
            responsive: true,
            title: {
              display: true,
              text: "New Users",
            },
            legend: { display: true, position: "right" },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="charts-top">
        <Line
          data={coursesData}
          options={{
            responsive: true,
            title: {
              display: true,
              text: "New Courses",
            },
            legend: { display: true, position: "right" },
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="bottom-charts-group">
        <div className="charts-bottom">
          <Pie
            data={teacherStudentData}
            options={{
              responsive: true,
              title: {
                display: true,
                text: "Student Teacher Ratio",
              },
              legend: { display: true, position: "right" },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="charts-bottom">
          <Pie
            data={verUnVerAccounts}
            options={{
              responsive: true,
              title: {
                display: true,
                text: "Verified & Unverified Accounts",
              },
              legend: { display: true, position: "right" },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataChards;
