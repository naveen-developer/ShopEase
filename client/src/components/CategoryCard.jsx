import React from "react";

function CategoryCard({ image, name }) {
  return (
    <a href="#" className="category-card">
      <span className="category-image">
        <img src={image} alt="" loading="lazy" />
      </span>
      <span className="category-name">{name}</span>
    </a>
  );
}

export default CategoryCard;
