import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import useApi from "../shared/useApi";
import { useAuthContext } from "../auth/context/AuthProvider.jsx";

const filterCategories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Toys",
];

const filterBrands = ["ShopEase Basics", "Nova", "Urban Craft", "Everline"];

function Products() {
  const api = useApi();

  const authContext = useAuthContext();

  //  console.log(authContext);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const { setCart } = authContext;
  // console.log("favourite value ", favourites);
  // console.log("cart array", cart);

  function toggleFavourite(id) {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((item) => item !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  }

  function cartItems(id) {
    setCart((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get("/products");

        setProducts(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load products. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section
        className="products-banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80)",
        }}
      >
        <div className="container products-banner-content">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span>Shop</span>
          </nav>
          <h1>All Products</h1>
          <p>
            Explore our complete collection of high-quality products for your
            everyday needs.
          </p>
        </div>
      </section>

      <section className="section products-section">
        <div className="container products-layout">
          <button type="button" className="btn btn-outline filters-mobile-btn">
            Filters
          </button>

          <div className="products-main">
            <div className="products-toolbar">
              <p className="products-count">
                {isLoading ? "Loading..." : `${products.length} Products`}
              </p>

              <div className="products-toolbar-actions">
                <div
                  className="view-toggle"
                  role="group"
                  aria-label="Product view"
                >
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label="List view"
                  >
                    <List size={18} aria-hidden="true" />
                  </button>
                </div>

                <button type="button" className="sort-btn">
                  Sort by: Popularity
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {isLoading && <p>Loading products...</p>}

            {!isLoading && error && <p className="field-error">{error}</p>}

            {!isLoading && !error && products.length === 0 && (
              <p>No products found.</p>
            )}

            {!isLoading && !error && products.length > 0 && (
              <div className="product-grid product-grid-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    image={product.image_url}
                    name={product.name}
                    rating={product.rating}
                    price={`₹${Number(product.price).toLocaleString("en-IN")}`}
                    favourite={favourites.includes(product._id)}
                    setFavourite={() => toggleFavourite(product._id)}
                    setCart={() => cartItems(product._id)}
                  />
                ))}
              </div>
            )}

            {/* <nav className="pagination" aria-label="Product pages">
              <button
                type="button"
                className="page-btn"
                aria-label="Previous page"
              >
                Prev
              </button>
              <button
                type="button"
                className="page-btn is-active"
                aria-current="page"
              >
                1
              </button>
              <button type="button" className="page-btn">
                2
              </button>
              <button type="button" className="page-btn">
                3
              </button>
              <button type="button" className="page-btn">
                4
              </button>
              <button type="button" className="page-btn">
                5
              </button>
              <span className="page-ellipsis">…</span>
              <button type="button" className="page-btn">
                25
              </button>
              <button type="button" className="page-btn" aria-label="Next page">
                Next
              </button>
            </nav> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
