import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/orders";
const statuses = ["Placed", "Shipped", "Delivered", "Cancelled"];

const statusStyle = {
  Placed: "bg-yellow-50 text-yellow-700",
  Shipped: "bg-blue-50 text-blue-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-600",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null); // details kaanikkunna order
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = () => {
    axios
      .get(API)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (order, newStatus) => {
    setUpdatingId(order.id);
    try {
      await axios.patch(`${API}/${order.id}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Status maattan pattiyilla. json-server run cheyyunnundo ennu nokku");
    } finally {
      setUpdatingId(null);
    }
  };

  const shown = orders
    .filter((o) => filter === "all" || (o.status || "Placed") === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) return <p className="text-gray-500">Loading orders...</p>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-serif">
          Orders <span className="text-base text-gray-400">({orders.length})</span>
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-base sm:text-sm bg-white focus:outline-none focus:border-yellow-600 sm:w-48"
        >
          <option value="all">All orders</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* ORDERS LIST */}
      <div className="flex flex-col gap-4">
        {shown.length === 0 && (
          <p className="text-gray-500 text-center py-12">Orders onnum kandilla.</p>
        )}

        {shown.map((o) => {
          const status = o.status || "Placed";
          const isOpen = openId === o.id;

          return (
            <div
              key={o.id}
              className="bg-white border border-gray-100 rounded-md shadow-sm p-4 md:p-5"
            >
              {/* TOP ROW */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-medium">Order #{o.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(o.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {" · "}
                    {o.address?.name || "-"}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold">₹{o.total}</span>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyle[status] || statusStyle.Placed}`}
                  >
                    {status}
                  </span>
                  <select
                    value={status}
                    disabled={updatingId === o.id}
                    onChange={(e) => changeStatus(o, e.target.value)}
                    className="border border-gray-200 rounded-md px-2 py-1.5 text-sm bg-white focus:outline-none focus:border-yellow-600 disabled:opacity-50"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DETAILS BUTTON */}
              <button
                onClick={() => setOpenId(isOpen ? null : o.id)}
                className="mt-3 text-sm text-yellow-700 hover:underline"
              >
                {isOpen ? "Hide details" : "View details"}
              </button>

              {/* DETAILS */}
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ITEMS */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm">Items</h4>
                    <div className="flex flex-col gap-3">
                      {(o.items || []).map((item, i) => (
                        <div key={`${item.id}-${i}`} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                          </div>
                          <p className="text-sm font-medium whitespace-nowrap">
                            ₹{item.price * item.qty}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <h4 className="font-semibold mb-3 text-sm">Delivery Address</h4>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p className="font-medium text-black">{o.address?.name}</p>
                      <p>{o.address?.address}</p>
                      <p>
                        {o.address?.city} - {o.address?.pincode}
                      </p>
                      <p>Phone: {o.address?.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminOrders;