import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [courses, setCourses] = useState([]);
  const { Option } = AutoComplete;

  useEffect(() => {
    Axios.get("https://courses4me.herokuapp.com/courses").then((res) =>
      setCourses(res.data)
    );
  }, []);

  const renderCourses = () => {
    return courses.map((course) => (
      <Option key={course.ID} value={course.title}>
        <Link to={`/course/${course.ID}`}>
          <div className="option-wrapper">
            <img src={course.cover_photo} />
            <span>{course.title}</span>
            <span>{course.rating}</span>
          </div>
        </Link>
      </Option>
    ));
  };

  return (
    <AutoComplete
      style={{ width: 400 }}
      placeholder="Search for courses..."
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      size="large"
      onSelect={(value) => props.setSearchState(value)}
    >
      {courses !== [] ? renderCourses() : ""}
    </AutoComplete>
  );
};

export default SearchBar;
