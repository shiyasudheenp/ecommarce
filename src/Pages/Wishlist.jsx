import { useContext } from "react";
import { Link } from "react-router-dom";
import { wishlistContext } from "./WishlistProvider";
import { cartContext } from "./CartProvider";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(wishlistContext);
  const { AddToCart } = useContext(cartContext);

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
    <div className="px-6 md:px-10 py-10">
      <h1 className="text-3xl font-serif mb-8">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-yellow-600 font-bold mt-1">₹{item.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => AddToCart(item)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md text-sm"
                >
                  Add To Cart
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