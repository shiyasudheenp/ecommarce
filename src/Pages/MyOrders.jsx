import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/oders")
      .then((res) => {
        // Puthiya order mukalil varan reverse cheyyunnu
        setOrders(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-24 text-gray-500">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-24 px-6">
        <h1 className="text-3xl font-serif mb-3">No Orders Yet</h1>
        <p className="text-gray-500 mb-6">You haven't placed any orders.</p>
        <Link to="/Shop" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-md font-medium transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif mb-8">My Orders</h1>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-md shadow-sm p-5">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
              <span className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full">
                {order.status || "Placed"}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-sm">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 font-bold">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;