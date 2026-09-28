import React from "react";
import { Link } from "react-router";
// import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-col footer-brand">
          <span className="logo">ShopEase</span>
          <p>
            Thoughtfully curated products for a smarter, happier and more
            beautiful everyday life.
          </p>
          <div className="footer-social">
            {/* <a href="#" aria-label="ShopEase on Facebook">
              <Facebook size={18} aria-hidden="true" />
            </a>
            <a href="#" aria-label="ShopEase on Instagram">
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a href="#" aria-label="ShopEase on Twitter">
              <Twitter size={18} aria-hidden="true" />
            </a> */}
          </div>
        </div>

        <div className="footer-col">
          <h3>Shop</h3>
          <ul>
            <li>
              <Link to="/products">All Products</Link>
            </li>
            <li>
              <Link to="/products">New Arrivals</Link>
            </li>
            <li>
              <Link to="/products">Best Sellers</Link>
            </li>
            <li>
              <Link to="/products">Deals</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Shipping Info</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
