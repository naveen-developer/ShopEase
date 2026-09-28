import React from "react";
import { Link } from "react-router-dom";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          ShopEase
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Shop</Link>
            </li>
            <li>
              <Link to="/products">Categories</Link>
            </li>
            <li>
              <Link to="/products">Deals</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>
        </nav>

        <div className="header-search">
          <label htmlFor="site-search" className="visually-hidden">
            Search for products, brands and more
          </label>
          <Search size={18} aria-hidden="true" className="header-search-icon" />
          <input
            id="site-search"
            type="search"
            placeholder="Search for products, brands and more..."
          />
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn header-search-toggle"
            aria-label="Search"
          >
            <Search size={20} aria-hidden="true" />
          </button>
          <button type="button" className="icon-btn" aria-label="Wishlist">
            <Heart size={20} aria-hidden="true" />
          </button>
          <button type="button" className="icon-btn" aria-label="Account">
            <User size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-btn cart-btn"
            aria-label="Cart, 3 items"
          >
            <ShoppingBag size={20} aria-hidden="true" />
            <span className="cart-badge">3</span>
          </button>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label="Open menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
