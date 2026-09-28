import React from "react";
import { Link, useNavigate } from "react-router";
import { Search, Heart, User, ShoppingBag, Menu, LogOut } from "lucide-react";
import { useAuthContext } from "../auth/context/AuthProvider";
import useApi from "../shared/useApi";

function Navbar() {
  const { user, setUser, setAccessToken, cart } = useAuthContext();

  const username = user?.email?.split("@")[0] || "";
  const api = useApi();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // console.log("logout request failed:", err.response?.data || err.message);
    } finally {
      // Clear client state regardless — the cookie may already be gone/expired
      setAccessToken(null);
      setUser(null);
      navigate("/login");
    }
  };

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

          <button
            type="button"
            className="icon-btn cart-btn"
            aria-label={`Cart, ${cart.length} items`}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            <span className="cart-badge">{cart.length}</span>
          </button>

          {user ? (
            <div className="nav-account">
              <Link
                to="/account"
                className="icon-btn"
                aria-label={`Account, signed in as ${username}`}
              >
                <User size={20} aria-hidden="true" />
              </Link>
              <span className="nav-username">{username}</span>
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} aria-hidden="true" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="nav-auth-links">
              <Link to="/login" className="btn btn-outline nav-auth-btn">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary nav-auth-btn">
                Sign Up
              </Link>
            </div>
          )}

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

export default Navbar;
