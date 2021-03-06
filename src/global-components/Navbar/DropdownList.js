import React, { useState } from "react";
import "./Dropdown.css";
import { Select } from "antd";

const DropdownList = props => {
  const { Option } = Select;
  const [categories] = useState([
    { id: "1", name: "Development", icon: "code" },
    { id: "2", name: "Business", icon: "chart-bar" },
    { id: "3", name: "Photography", icon: "camera-retro" },
    { id: "4", name: "Design", icon: "pencil-alt" },
    { id: "5", name: "Marketing", icon: "ad" },
    { id: "6", name: "Lifestyle", icon: "smile" },
    { id: "7", name: "Music", icon: "music" },
    { id: "8", name: "Health", icon: "heart" },
  ]);

  const renderOptions = () => {
    return categories.map(ctr => (
      <Option
        value={ctr.name.toLowerCase()}
        key={ctr.id}
        className="dropdown-item"
      >
        {ctr.name}
      </Option>
    ));
  };
  return (
    <Select
      value={props.selectedCategory}
      defaultValue={props.selectedCategory}
      style={{
        width: 150,
        // background: `linear-gradient(
        //   90deg,
        //   rgba(238, 108, 77, 1) 0%,
        //   rgba(244, 155, 133, 1) 100%
        // )`,

        color: "#999",
      }}
      className="main-dropdown-cat"
      bordered={false}
      size="medium"
      onChange={value => props.setDropDownValue(value.toLowerCase())}
    >
      <Option value="all" key="0" className="dropdown-item">
        All
      </Option>
      {renderOptions()}
    </Select>
  );
};

export default DropdownList;
