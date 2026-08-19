

// import { useEffect, useState } from "react";
// import axios from "axios";

// function Products() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3001/product")
//       .then((res) => setProducts(res.data));
//   }, []);

//   return (
//     <div className="px-10 py-10">

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-2xl shadow-sm overflow-hidden group relative"
//           >

//             {/* IMAGE */}
//             <div className="relative">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-64 object-cover"
//               />

//               {/* BADGES */}
//               <div className="absolute top-3 left-3 flex gap-2">
//                 {item.isNew && (
//                   <span className="bg-black text-white text-xs px-2 py-1 rounded">
//                     NEW
//                   </span>
//                 )}
//                 {item.discount && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
//                     -{item.discount}%
//                   </span>
//                 )}
//               </div>

//               {/* ICONS */}
//               <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
//                 <button className="bg-white p-2 rounded-full shadow">
//                   ❤️
//                 </button>
//                 <button className="bg-white p-2 rounded-full shadow">
//                   🛒
//                 </button>
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="p-4">
//               <p className="text-xs text-g ray-400 uppercase">
//                 {item.category}
//               </p>

//               <h2 className="font-semibold text-lg">
//                 {item.name}
//               </h2>

//               {/* RATING */}
//               <div className="flex items-center gap-1 text-yellow-400 text-sm">
//                 {"★".repeat(item.rating)}
//                 <span className="text-gray-500 text-xs">
//                   ({item.reviews})
//                 </span>
//               </div>

//               {/* PRICE */}
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="font-bold text-lg">
//                   ₹{item.price}
//                 </span>
//                 <span className="line-through text-gray-400 text-sm">
//                   ₹{item.oldPrice}
//                 </span>
//               </div>
//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

// export default Products;




import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { cartContext } from "../Pages/CartProvider";
import { wishlistContext } from "../Pages/WishlistProvider";

function Featured() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { AddToCart } = useContext(cartContext);
  const { toggleWishlist, isWishlisted } = useContext(wishlistContext);

  useEffect(() => {
    axios.get("http://localhost:3001/product")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="px-6 md:px-10 py-14">
      <h2 className="text-2xl font-serif text-center mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="relative bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden"
          >
            {/* WISHLIST */}
            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10"
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
              className="w-full h-56 object-cover"
            />
            </Link>

            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-yellow-600 font-bold mt-1">₹{item.price}</p>
              

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => AddToCart(item)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md text-sm"
                >
                  Add To Cart
                </button>
               <button
                 onClick={() => {
                const isLoggedIn = localStorage.getItem("user");
                if (isLoggedIn) {
                 navigate(`/checkout/${item.id}`);
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;