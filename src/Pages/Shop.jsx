// // // // import React, { useContext, useEffect, useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { cartContext } from "./CartProvider";

// // // // function Shop() {
// // // //   const [products, setProducts] = useState([]);
// // // //   const { AddToCart } = useContext(cartContext);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetch("http://localhost:3001/products")
// // // //       .then((res) => res.json())
// // // //       .then((data) => setProducts(data))
// // // //       .catch((err) => console.log(err));
// // // //   }, []);

// // // //   return (
// // // //     <div className="container mx-auto p-4">
// // // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // // //         {products.map((product) => (
// // // //           <div
// // // //             key={product.id}
// // // //             className="border rounded-lg p-4 shadow-md text-center"
// // // //           >
// // // //             <img
// // // //               src={product.image}
// // // //               alt={product.name}
// // // //               className="w-full h-48 object-cover rounded"
// // // //             />

// // // //             <h3 className="text-lg font-semibold mt-2">
// // // //               {product.name}
// // // //             </h3>

// // // //             <p>⭐ {product.rating}</p>

// // // //             <p className="text-green-600 font-bold">
// // // //               ₹{product.price}
// // // //             </p>

// // // //             <button
// // // //               onClick={() => {
// // // //                 AddToCart(product);
// // // //                 navigate("/");
// // // //               }}
// // // //               className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-600"
// // // //             >
// // // //               Add To Cart
// // // //             </button>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Shop;


// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { cartContext } from "./CartProvider";
// import { wishlistContext } from "./WishlistProvider";
// import { FaHeart } from "react-icons/fa";

// function Shop() {
//   const { category } = useParams();

//   const [products, setProducts] = useState([]);

//   const { AddToCart } = useContext(cartContext);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/products")
//       .then((res) => {
//         const filtered = category
//           ? res.data.filter((item) => item.category === category)
//           :res.data;

//         setProducts(filtered);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [category]);

//   return (
//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         {category} Products
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//         {products.map((item) => (

//           <div
//             key={item.id}
//             className="border rounded-lg p-4 shadow-md"
//           >

//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-56 object-cover rounded-md"
//             />

//             <h2 className="text-xl font-semibold mt-3">
//               {item.name}
//             </h2>

//             <p className="text-green-600 font-bold mt-2">
//               ₹{item.price}
//             </p>

//             <div className="flex gap-3 mt-4">
//               {/* heart buton */}
//               <button
//                  onClick={() => toggleWishlist(item)}
//                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
//                     >
//                 <FaHeart className={isWishlisted(item.id) ? "text-red-500" : "text-gray-300"} />
//                 </button>

//               {/* ADD TO CART */}
//               <button
//                 onClick={() => AddToCart(item)}
//                 className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
//               >
//                 Add To Cart
//               </button>

//               {/* BUY */}
//               <button
//                 onClick={() => navigate(`/checkout/${item.id}`)}
//                 className="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded-md"
//               >
//                 BUY
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }

// export default Shop;



import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { cartContext } from "./CartProvider";
import { wishlistContext } from "./WishlistProvider";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Shop() {
  const { category } = useParams();

  const [searchParams] = useSearchParams();
const searchTerm = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);

  const { AddToCart } = useContext(cartContext);
  const { toggleWishlist, isWishlisted } = useContext(wishlistContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get("http://localhost:3001/products")
    .then((res) => {
      let filtered = res.data;

      if (category) {
        filtered = filtered.filter((item) => item.category === category);
      }

      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setProducts(filtered);
    })
   
      .catch((error) => {
        console.log(error);
      });
  }, [category,searchTerm]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
  {searchTerm ? `Search results for "${searchTerm}"` : `${category || ""} Products`}
</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((item) => (

          <div
            key={item.id}
            className="relative border rounded-lg p-4 shadow-md"
          >

            {/* WISHLIST */}
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

            <h2 className="text-xl font-semibold mt-3">
              {item.name}
            </h2>
            </Link>

            <p className="text-green-600 font-bold mt-2">
              ${item.price}
            </p>

            <div className="flex gap-3 mt-4">
              {/* ADD TO CART */}
              <button
                onClick={() => AddToCart(item)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
              >
                Add To Cart
              </button>

              {/* BUY */}
              <button
                onClick={() => navigate(`/checkout/${item.id}`)}
                className="flex-1 bg-black text-white hover:bg-gray-800 py-2 rounded-md"
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