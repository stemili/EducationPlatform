import React, { useState } from "react";
import "./CategoryCard.css";

const CategoryCard = ({
  setSelectedCategory,
  setFocusSearch,
  setOpenNavbar,
}) => {
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
  const cardsList = categories.map(item => {
    return (
      <div
        className="category-card"
        key={item.id}
        onClick={async () => {
          window.scrollTo(0, 0);
          setSelectedCategory(item.name.toLowerCase());
          setTimeout(() => {
            setOpenNavbar(true);
          }, 400);
          setTimeout(() => {
            setFocusSearch(true);
          }, 800);
        }}
      >
        <img
          src={
            process.env.PUBLIC_URL + `/resources/${item.name.toLowerCase()}.png`
          }
          alt={`${item.name} category`}
          className="category-card-image"
        />
        <div className="category-card-content">
          <i className={`fas fa-${item.icon} silver`}></i>
          <h3>{item.name.toUpperCase()}</h3>
        </div>
      </div>
    );
  });
  return (
    <div className="categories-section">
      <h1>Categories</h1>
      {cardsList}
    </div>
  );
};

export default CategoryCard;
