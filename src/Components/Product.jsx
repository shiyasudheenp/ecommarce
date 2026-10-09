import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../Pages/CartProvider";
import { wishlistContext } from "../Pages/WishlistProvider";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const { cart, AddToCart, updateQty, removeFromCart } = useContext(cartContext);
  const { toggleWishlist, isWishlisted } = useContext(wishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then((res) => {
        const trending = res.data.filter((item) => item.trending === true);
        setProducts(trending);
      })
      .catch((err) => console.log(err));
  }, []);

  // Ee product cart-il undenkil, aa item-inte qty return cheyyum, illenkil 0
  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  return (
        <div className="px-4 md:px-10 py-8 md:py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Trending Products</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products.map((item) => (
                    <div key={item.id} className="relative rounded-lg p-2.5 md:p-4 shadow-md">

            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10"
            >
              <FaHeart className={isWishlisted(item.id) ? "text-red-500" : "text-gray-300"} />
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
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                  Added ✓
                </button>
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

export default Products;