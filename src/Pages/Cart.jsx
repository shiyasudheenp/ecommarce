


// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { cartContext } from "./CartProvider";

// function Cart() {
//   const { cart, removeFromCart, updateQty } = useContext(cartContext);

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   if (cart.length === 0) {
//     return (
//       <div className="text-center py-24 px-6">
//         <h1 className="text-3xl font-serif mb-3">Your Cart is Empty</h1>
//         <p className="text-gray-500 mb-6">
//           Looks like you haven't added anything yet.
//         </p>
//         <Link
//           to="/Shop"
//           className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-md font-medium transition-all"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="px-6 md:px-10 py-10">
//       <h1 className="text-3xl font-serif mb-8">Your Cart</h1>

//       <div className="flex flex-col gap-4">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center gap-4 bg-white border border-gray-100 rounded-md shadow-sm p-4"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-20 h-20 object-cover rounded-md"
//             />

//             <div className="flex-1">
//               <h2 className="font-semibold text-black-500">{item.name}</h2>
//               <p className="text-yellow-600 font-bold mt-1">₹{item.price}</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => updateQty(item.id, item.qty - 1)}
//                 className="w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100 text-lg"
//               >
//                 −
//               </button>
//               <span className="w-5 text-center">{item.qty}</span>
//               <button
//                 onClick={() => updateQty(item.id, item.qty + 1)}
//                 className="w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100 text-lg"
//               >
//                 +
//               </button>
//             </div>

//             <p className="font-semibold w-20 text-right">
//               ₹{item.price * item.qty}
//             </p>

//             <button
//               onClick={() => removeFromCart(item.id)}
//               className="text-red-500 hover:text-red-700 text-sm font-medium ml-2"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 border-t border-gray-100 pt-6">
//         <Link to="/Shop" className="text-sm text-gray-500 hover:text-yellow-600">
//           ← Continue Shopping
//         </Link>

//         <div className="text-right">
//           <p className="text-xl font-bold mb-3">Total: ₹{total}</p>
//           <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all">
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;












// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { cartContext } from "./CartProvider";

// function Cart() {
//   const { cart, removeFromCart, updateQty } = useContext(cartContext);
//   const [orderMsg, setOrderMsg] = useState(null);

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   // Buy just this one item — places the order for it alone and removes
//   // it from the cart, without touching the other items.
//   const handleBuyNow = (item) => {
//     const itemTotal = item.price * item.qty;
//     setOrderMsg(`Order placed for "${item.name}" — ₹${itemTotal}`);
//     removeFromCart(item.id);
//     setTimeout(() => setOrderMsg(null), 4000);
//   };

//   const handleCheckout = () => {
//     setOrderMsg(`Order placed for ${cart.length} item(s) — ₹${total}`);
//     cart.forEach((item) => removeFromCart(item.id));
//     setTimeout(() => setOrderMsg(null), 4000);
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="text-center py-24 px-6">
//         {orderMsg && (
//           <div className="max-w-md mx-auto mb-6 bg-green-50 text-green-700 border border-green-200 rounded-md px-4 py-3 text-sm">
//             ✓ {orderMsg}
//           </div>
//         )}
//         <h1 className="text-3xl font-serif mb-3">Your Cart is Empty</h1>
//         <p className="text-gray-500 mb-6">
//           Looks like you haven't added anything yet.
//         </p>
//         <Link
//           to="/Shop"
//           className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-md font-medium transition-all"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="px-6 md:px-10 py-10">
//       <h1 className="text-3xl font-serif mb-8">Your Cart</h1>

//       {orderMsg && (
//         <div className="mb-6 bg-green-50 text-green-700 border border-green-200 rounded-md px-4 py-3 text-sm">
//           ✓ {orderMsg}
//         </div>
//       )}

//       <div className="flex flex-col gap-4">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-gray-100 rounded-md shadow-sm p-4"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-20 h-20 object-cover rounded-md"
//             />

//             <div className="flex-1">
//               <h2 className="font-semibold text-black-500">{item.name}</h2>
//               <p className="text-yellow-600 font-bold mt-1">₹{item.price}</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => updateQty(item.id, item.qty - 1)}
//                 className="w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100 text-lg"
//               >
//                 −
//               </button>
//               <span className="w-5 text-center">{item.qty}</span>
//               <button
//                 onClick={() => updateQty(item.id, item.qty + 1)}
//                 className="w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100 text-lg"
//               >
//                 +
//               </button>
//             </div>

//             <p className="font-semibold w-20 text-right">
//               ₹{item.price * item.qty}
//             </p>

//             <div className="flex items-center gap-3 ml-2">
//               <button
//                 onClick={() => handleBuyNow(item)}
//                 className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-all whitespace-nowrap"
//               >
//                 Buy Now
//               </button>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500 hover:text-red-700 text-sm font-medium"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 border-t border-gray-100 pt-6">
//         <Link to="/Shop" className="text-sm text-gray-500 hover:text-yellow-600">
//           ← Continue Shopping
//         </Link>

//         <div className="text-right">
//           <p className="text-xl font-bold mb-3">Total: ₹{total}</p>
//           <button
//             onClick={handleCheckout}
//             className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;




import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "./CartProvider";

function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(cartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Ee item mathram buy cheyyan — checkout page-lekk item details kond pokum
  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { items: [item] } });
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { items: cart } });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-24 px-6">
        <h1 className="text-3xl font-serif mb-3">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
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
      <h1 className="text-3xl font-serif mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-gray-100 rounded-md shadow-sm p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-black-500">{item.name}</h2>
              <p className="text-yellow-600 font-bold mt-1">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100 text-lg"
              >
                −
              </button>
              <span className="w-5 text-center">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100 text-lg"
              >
                +
              </button>
            </div>

            <p className="font-semibold w-20 text-right">
              ₹{item.price * item.qty}
            </p>

            <div className="flex items-center gap-3 ml-2">
              <button
                onClick={() => handleBuyNow(item)}
                className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-all whitespace-nowrap"
              >
                Buy Now
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 border-t border-gray-100 pt-6">
        <Link to="/Shop" className="text-sm text-gray-500 hover:text-yellow-600">
          ← Continue Shopping
        </Link>

        <div className="text-right">
          <p className="text-xl font-bold mb-3">Total: ₹{total}</p>
          <button
            onClick={handleCheckout}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;







