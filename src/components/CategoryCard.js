import React, { useState } from "react";
import "../styles/CategoryCard.css";

const CategoryCard = () => {
  const [categories] = useState([
    { id: "1", name: "Programming", icon: "code" },
    { id: "2", name: "Bussiness", icon: "chart-bar" },
    { id: "3", name: "Photography", icon: "camera-retro" },
    { id: "4", name: "Programming", icon: "fas fa-code" },
    { id: "5", name: "Bussiness", icon: "chart-bar" },
    { id: "6", name: "Photography", icon: "camera-retro" },
    { id: "7", name: "Bussiness", icon: "chart-bar" },
    { id: "8", name: "Photography", icon: "camera-retro" },
  ]);
  const cardsList = categories.map((item) => {
    return (
      <div className="category-card" key={item.id}>
        <img
          src={`../resources/${item.name}.png`}
          alt="Programming category"
          className="category-card-image"
        />
        <div className="category-card-content">
          <i className={`fas fa-${item.icon} silver`}></i>
          <h3>{item.name.toUpperCase()}</h3>
        </div>
      </div>
    );
  });
  return <div className="categories-section">{cardsList}</div>;
};

export default CategoryCard;
