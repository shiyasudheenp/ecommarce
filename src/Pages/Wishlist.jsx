import { useContext } from "react";
import { Link } from "react-router-dom";
import { wishlistContext } from "./WishlistProvider";
import { cartContext } from "./CartProvider";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(wishlistContext);
    const { cart, AddToCart, removeFromCart } = useContext(cartContext);
   const isInCart = (id) => cart.some((c) => c.id === id);

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-24 px-6">
        <h1 className="text-3xl font-serif mb-3">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-6">Save items you like here.</p>
        <Link
          to="/Shop"
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-md font-medium transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
        <div className="px-4 md:px-10 py-8 md:py-10">
      <h1 className="text-2xl md:text-3xl font-serif mb-6 md:mb-8">Your Wishlist</h1>

       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden"
          >
             <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 md:h-56 object-cover"
              />
            </Link>
            <div className="p-3 md:p-4">
              <Link to={`/product/${item.id}`}>
                <h2 className="font-semibold text-sm md:text-base hover:text-yellow-600">{item.name}</h2>
              </Link>
                            <div className="flex items-baseline gap-2 mt-1">
                <span className="text-base font-semibold text-black">₹{item.price}</span>
                {item.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{item.oldPrice}</span>
                )}
              </div>
              <p className="text-xs text-green-600 font-medium mt-1">
                ₹1,300 OFF/gm on 24KT Gold
              </p>
              <div className="flex flex-col md:flex-row gap-2 mt-3">
                <button
                  onClick={() =>
                    isInCart(item.id) ? removeFromCart(item.id) : AddToCart(item)
                  }
                  className={`flex-1 text-white py-2 rounded-md text-sm ${
                    isInCart(item.id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  }`}
                >
                  {isInCart(item.id) ? "Added ✓" : "Add To Cart"}
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex-1 border border-gray-200 hover:bg-gray-100 py-2 rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;