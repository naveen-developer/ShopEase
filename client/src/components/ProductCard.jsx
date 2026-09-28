import React from "react";
import { Heart, Star } from "lucide-react";

function ProductCard({
  image,
  name,
  rating,
  reviews,
  price,
  oldPrice,
  discount,
  setFavourite,
  favourite,
  setCart,
  cart,
}) {
  return (
    <article className="product-card">
      <div className="product-card-media">
        {discount && <span className="badge badge-sale">{discount}</span>}
        <button
          type="button"
          className="icon-btn wishlist-btn"
          aria-label={`Add ${name} to wishlist`}
          onClick={setFavourite}
        >
          <Heart
            size={18}
            aria-hidden="true"
            color={favourite ? "#cd2d2d" : ""}
            fill={favourite ? "#cd2d2d" : "none"}
          />
        </button>
        <img src={image} alt={name} loading="lazy" />
      </div>

      <div className="product-card-body">
        <h3 className="product-name">{name}</h3>

        {rating && (
          <div className="product-rating">
            <Star size={14} aria-hidden="true" className="star-icon" />
            <span>{rating}</span>
            {reviews && <span className="reviews-count">({reviews})</span>}
          </div>
        )}

        <div className="product-price">
          <span className="price">{price}</span>
          {oldPrice && <span className="old-price">{oldPrice}</span>}
        </div>

        <button
          type="button"
          className="btn btn-primary btn-add-cart"
          onClick={setCart}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
