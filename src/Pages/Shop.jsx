
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { cartContext } from "./CartProvider";
import { wishlistContext } from "./WishlistProvider";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";

function Shop() {
  const { category } = useParams();

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [addedId, setAddedId] = useState(null);

  const { cart, AddToCart, updateQty, removeFromCart } = useContext(cartContext);
  const { toggleWishlist, isWishlisted } = useContext(wishlistContext);

  const navigate = useNavigate();

  // Fetch ALL products once
  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter whenever category, search, or the product list changes
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
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProducts(filtered);
  }, [category, searchTerm, allProducts]);

    // Ee product cart-il undenkil, aa item-inte qty return cheyyum, illenkil 0
  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {searchTerm ? `Search results for "${searchTerm}"` : `${category || "All"} Products`}
      </h1>

      {products.length === 0 && (
        <p className="text-gray-500 text-center py-16">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((item) => (

          <div
            key={item.id}
            className="relative  rounded-lg p-4 shadow-md"
          >

            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
            >
              <FaHeart
                className={
                  isWishlisted(item.id) ? "text-red-500" : "text-gray-300"
                }
              />
            </button>


                     <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover rounded-md"
              />

              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-black">₹{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{item.oldPrice}</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">
                  {item.name}
                </p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  ₹1,300 OFF/gm on 24KT Gold
                </p>
              </div>
            </Link>

            {/* <p className="text-green-600 font-bold mt-2">
              ₹{item.price}
            </p> */}

            

            <div className="flex gap-3 mt-4">
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