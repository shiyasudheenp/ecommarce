// // import { useContext } from "react";
// // import { cartContext } from "./CartProvider";

// // function Cart() {

// //   const { cart } = useContext(cartContext);

// //   return (
// //     <div>
// //       <h1>Cart Page</h1>
// //       {cart.map((item)=>(
// //         <div key={item.id}>
// //           <h3>{item.name}</h3>
// //             <p>${cart.length}</p>
// //         </div>
      

// //       ))}
    
// //     </div>
// //   );
// // }

// // export default Cart;




// import { useContext } from "react";
// import { cartContext } from "./CartProvider";

// function Cart() {
//   const { cart } = useContext(cartContext);

//   return (
//     <div>
//       <h1>Cart Page</h1>
//       {cart.length === 0 && <p>Your cart is empty</p>}
//       {cart.map((item, index) => (
//         <div key={index}>
//           <h3>{item.name}</h3>
//           <p>₹{item.price}</p>   {/* 👈 munpu ${cart.length} aayirunnu, wrong */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Cart;


import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "./CartProvider";

function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(cartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-md shadow-sm p-4"
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

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium ml-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 border-t border-gray-100 pt-6">
        <Link to="/Shop" className="text-sm text-gray-500 hover:text-yellow-600">
          ← Continue Shopping
        </Link>

        <div className="text-right">
          <p className="text-xl font-bold mb-3">Total: ₹{total}</p>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
