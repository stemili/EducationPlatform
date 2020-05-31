import React from "react";
import "../styles/CategoryCard.css";

const CategoryCard = (props) => {
  console.log(props);
  const cardsList = props.categories.map((item) => {
    const srcImg = require(`../resources/${item.name.toLowerCase()}.png`);
    const srcIcon = require(`../resources/${item.name.toLowerCase()}-icon.png`);
    return (
      <div className="category-card" key={item.id}>
        <img
          src={srcImg}
          alt="Programming category"
          className="category-card-image"
        />
        <div className="category-card-content">
          <img
            src={srcIcon}
            className="category-card-icon"
            alt="Programming icon"
          />
          <h2>{item.name.toUpperCase()}</h2>
        </div>
      </div>
    );
  });
  return <div className="categories-section">{cardsList}</div>;
};

export default CategoryCard;
