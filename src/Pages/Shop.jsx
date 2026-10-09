import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { cartContext } from "./CartProvider";
import { wishlistContext } from "./WishlistProvider";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";

function Shop() {
  const { category } = useParams();

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const { cart, AddToCart, updateQty, removeFromCart } = useContext(cartContext);
  const { toggleWishlist, isWishlisted } = useContext(wishlistContext);

  const navigate = useNavigate();

  // Fetch ALL products once
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setAllProducts(res.data))
      .catch((error) => console.log(error));
  }, []);

  // Filter + sort whenever anything changes
  useEffect(() => {
    let filtered = allProducts;

    if (category) {
      filtered = filtered.filter(
        (item) =>
          item.category &&
          item.category.trim().toLowerCase() === category.trim().toLowerCase()
      );
    }

          if (searchTerm) {
      const toSingular = (w) => (w.endsWith("s") ? w.slice(0, -1) : w);

      // search-il ulla ella words-um item-il undakanam ("gold necklace" pole)
      const queryWords = searchTerm.trim().toLowerCase().split(/\s+/);

      filtered = filtered.filter((item) => {
        // name + category-ile muzhuvan words (substring alla)
        const itemWords = `${item.name} ${item.category}`
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter(Boolean);

        return queryWords.every((q) => {
          const qs = toSingular(q);
          return itemWords.some((w) => w === q || toSingular(w) === qs);
        });
      });
    }

    const sorted = [...filtered];

    if (sortBy === "newest") {
      sorted.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortBy === "bestseller") {
      sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sortBy === "priceLow") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      sorted.sort(
        (a, b) =>
          (b.rating || 0) - (a.rating || 0) || (b.reviews || 0) - (a.reviews || 0)
      );
    }

    setProducts(sorted);
  }, [category, searchTerm, allProducts, sortBy]);

  // Cart-il ee product undenkil qty, illenkil 0
  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

    return (
    <div className="px-4 py-5 md:p-6">

      {/* HEADER: title + count (left), SORT BY (right) */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
               <p className="text-sm text-gray-500">
          {searchTerm
            ? `Search results for "${searchTerm}" · ${products.length} Designs`
            : `${products.length} Designs`}
        </p>
           <div className="flex items-center justify-between sm:justify-start gap-2 text-sm">
         <label htmlFor="sort" className="text-gray-500 uppercase tracking-wide">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 uppercase font-medium text-gray-800 bg-white focus:outline-none focus:border-yellow-600"
          >
            <option value="newest">New Arrival</option>
            <option value="bestseller">Bestseller</option>
            <option value="priceLow">Price - Low to High</option>
            <option value="priceHigh">Price - High to Low</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 text-center py-16">No products found.</p>
      )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products.map((item) => (
          <div key={item.id} className="relative rounded-lg p-2.5 md:p-4 shadow-md">

            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-2 right-2 md:top-3 md:right-3 bg-white p-1.5 md:p-2 rounded-full shadow z-10"
            >
              <FaHeart
                className={isWishlisted(item.id) ? "text-red-500" : "text-gray-300"}
              />
            </button>

            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 md:h-56 object-cover rounded-md"
              />

              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-black">₹{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{item.oldPrice}</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">{item.name}</p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  ₹1,300 OFF/gm on 24KT Gold
                </p>
              </div>
            </Link>

               <div className="flex flex-col md:flex-row gap-2 md:gap-3 mt-3 md:mt-4">
              {getQty(item.id) === 0 ? (
                <button
                  onClick={() => AddToCart(item)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
                >
                  Add To Cart
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-between bg-yellow-500 text-white rounded-md px-3 py-2">
                  <button
                    onClick={() => {
                      if (getQty(item.id) === 1) {
                        removeFromCart(item.id);
                      } else {
                        updateQty(item.id, getQty(item.id) - 1);
                      }
                    }}
                    className="px-2"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="font-medium">{getQty(item.id)}</span>
                  <button
                    onClick={() => updateQty(item.id, getQty(item.id) + 1)}
                    className="px-2"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  const isLoggedIn = localStorage.getItem("user");
                  if (isLoggedIn) {
                    navigate("/checkout", { state: { items: [{ ...item, qty: 1 }] } });
                  } else {
                    alert("Please login to continue!");
                    navigate("/login");
                  }
                }}
                className="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded-md text-sm"
              >
                BUY
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;