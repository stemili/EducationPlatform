import React, { useEffect, useState, useRef } from "react";
import { AutoComplete } from "antd";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = props => {
  const [courses, setCourses] = useState([]);
  const [searchState, setSearchState] = useState("");
  const { Option } = AutoComplete;

  const textSearchInput = useRef(null);
  useEffect(() => {
    Axios.get(
      `https://courses4me.herokuapp.com/courses/search?title=${searchState}`
    ).then(res => setCourses(res.data));
  }, [searchState]);

  useEffect(() => {
    if (props.focusSearch) {
      textSearchInput.current.focus();
      // console.log(textSearchInput.current.props);
      // console.log(textSearchInput);
    }
  }, [props]);

  const renderCourses = () => {
    let filteredCourses = courses;
    if (props.dropdownValue !== "all") {
      filteredCourses = courses.filter(
        course => course.category === props.dropdownValue
      );
    }
    return filteredCourses.map(course => (
      <Option key={course.id} value={course.title}>
        <Link to={`/courses/${course.id}`}>
          <div className="option-wrapper">
            <img src={course.cover_photo} alt={course.title} />
            <span>{course.title}</span>
            <span>{course.rating}</span>
          </div>
        </Link>
      </Option>
    ));
  };

  return (
    <AutoComplete
      style={{ width: 350, border: "1px solid #ffffff" }}
      placeholder="Search for courses..."
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      // autoFocus={props.focusSearch}
      onBlur={() => props.setFocusSearch(false)}
      open={props.focusSearch}
      ref={textSearchInput}
      onFocus={() => props.setFocusSearch(true)}
      size="large"
      value={searchState}
      onSelect={value => {
        setSearchState(value);
        if (!props.desktop) {
          props.closeMenu();
        }
        props.setFocusSearch(false);
      }}
      onChange={value => setSearchState(value)}

      // className={props.focusSearch ? "main-search-bar-active" : "main-search-bar"}
      // className="main-search-bar"
    >
      {courses !== [] ? renderCourses() : ""}
    </AutoComplete>
  );
};

export default SearchBar;
