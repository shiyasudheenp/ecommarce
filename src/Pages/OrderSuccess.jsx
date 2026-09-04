// import { useLocation, Navigate, Link } from "react-router-dom";

// function OrderSuccess() {
//   const location = useLocation();
//   const { items, total } = location.state || {};

//   // Direct URL vazhi vannu ith open cheythaal home-lek pokum
//   if (!items || items.length === 0) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="max-w-2xl mx-auto px-6 py-16 text-center">
//       <div className="text-green-500 text-6xl mb-4">✓</div>
//       <h1 className="text-3xl font-serif mb-2">Order Placed Successfully!</h1>
//       <p className="text-gray-500 mb-8">
//         Thank you for shopping with Shaa Jewels.
//       </p>

//       <div className="bg-white border border-gray-100 rounded-md shadow-sm text-left divide-y divide-gray-100 mb-8">
//         {items.map((item) => (
//           <div key={item.id} className="flex items-center gap-4 p-4">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-16 h-16 object-cover rounded-md"
//             />
//             <div className="flex-1">
//               <p className="font-medium">{item.name}</p>
//               <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
//             </div>
//             <p className="font-semibold">₹{item.price * item.qty}</p>
//           </div>
//         ))}

//         <div className="flex justify-between items-center p-4 font-bold text-lg">
//           <span>Total Paid</span>
//           <span>₹{total}</span>
//         </div>
//       </div>

//       <Link
//         to="/Shop"
//         className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all"
//       >
//         Continue Shopping
//       </Link>
//     </div>
//   );
// }

// export default OrderSuccess;










import { useLocation, Navigate, Link } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h1 className="text-3xl font-serif mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-500 mb-8">Thank you for shopping with Shaa Jewels.</p>

      <div className="bg-white border border-gray-100 rounded-md shadow-sm text-left divide-y divide-gray-100 mb-8">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
            </div>
            <p className="font-semibold">₹{item.price * item.qty}</p>
          </div>
        ))}
        <div className="flex justify-between items-center p-4 font-bold text-lg">
          <span>Total Paid</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/my-orders" className="inline-block border border-yellow-600 text-yellow-700 px-8 py-2.5 rounded-md font-medium transition-all">
          View My Orders
        </Link>
        <Link to="/Shop" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;