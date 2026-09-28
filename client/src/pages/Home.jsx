import React from "react";
import { Link } from "react-router";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Gem,
  BadgeCheck,
  Headphones,
} from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuthContext } from "../auth/context/AuthProvider.jsx";

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&q=80",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&q=80",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80",
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=80",
  },
  {
    name: "Toys",
    image:
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=300&q=80",
  },
  {
    name: "Gifting",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80",
  },
  {
    name: "More",
    image:
      "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=300&q=80",
  },
];

const featuredProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: "4.8",
    reviews: "120",
    price: "₹4,999",
    oldPrice: "₹6,999",
    discount: "30% OFF",
  },
  {
    name: "Smart Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: "4.6",
    reviews: "98",
    price: "₹7,499",
    oldPrice: "₹9,999",
    discount: "25% OFF",
  },
  {
    name: "Minimalist Backpack",
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=80",
    rating: "4.7",
    reviews: "64",
    price: "₹2,299",
    oldPrice: "₹2,999",
    discount: "20% OFF",
  },
  {
    name: "Ceramic Table Lamp",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    rating: "4.9",
    reviews: "42",
    price: "₹1,899",
    oldPrice: "₹2,499",
    discount: "24% OFF",
  },
];

function Home() {
  const { user } = useAuthContext();

  const username = user?.email?.split("@")[0] || "";

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="hero-label">New Collection</span>
            <h1>
              {username && (
                <>
                  Welcome, <span className="username">{username}</span>
                  <br />
                </>
              )}
              Bring Home
              <br />
              What You Love
            </h1>
            <p>
              Discover thoughtfully curated products for a smarter, happier and
              more beautiful everyday life.
            </p>
            <Link to="/products" className="btn btn-primary">
              Shop Now →
            </Link>
          </div>

          <div className="hero-media">
            <img
              src="https://images.pexels.com/photos/994197/pexels-photo-994197.jpeg"
              alt="A woman carrying shopping bags while browsing a sunlit boutique"
            />
            <div className="hero-floating-card">
              <img
                src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&q=80"
                alt="Leather tote bag"
              />
              <div>
                <p className="hero-floating-name">Leather Tote Bag</p>
                <p className="hero-floating-price">₹3,499</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-strip">
        <div className="container benefits-strip-inner">
          <FeatureCard icon={<Truck size={26} />} title="Free Shipping" />
          <FeatureCard icon={<RotateCcw size={26} />} title="Easy Returns" />
          <FeatureCard
            icon={<ShieldCheck size={26} />}
            title="Secure Payment"
          />
        </div>
      </section>

      <section className="section categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section promo-section">
        <div className="container promo-grid">
          <div
            className="promo-card promo-card-large"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80)",
            }}
          >
            <div className="promo-card-content">
              <span className="promo-eyebrow">Limited time</span>
              <h3>Up to 50% OFF</h3>
              <Link to="/products" className="btn btn-secondary">
                Shop the Sale
              </Link>
            </div>
          </div>
          <div
            className="promo-card promo-card-small"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80)",
            }}
          >
            <div className="promo-card-content">
              <h3>Trending Electronics</h3>
              <Link to="/products" className="btn btn-outline-light">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="product-grid product-grid-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="editorial-banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80)",
        }}
      >
        <div className="container editorial-banner-content">
          <h2>Express Your Unique Style</h2>
          <p>Fashion pieces designed for everyday confidence.</p>
          <Link to="/products" className="btn btn-primary">
            Discover the Edit
          </Link>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container trust-grid">
          <FeatureCard icon={<Gem size={24} />} title="Quality Products" />
          <FeatureCard icon={<BadgeCheck size={24} />} title="Trusted Brands" />
          <FeatureCard icon={<Truck size={24} />} title="Fast Delivery" />
          <FeatureCard icon={<Headphones size={24} />} title="24/7 Support" />
        </div>
      </section>
    </>
  );
}

export default Home;
