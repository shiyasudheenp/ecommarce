import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/products"),
      axios.get("http://localhost:3001/orders"),
      axios.get("http://localhost:3001/users"),
    ])
      .then(([p, o, u]) => {
        setProducts(p.data);
        setOrders(o.data);
        setUsers(u.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  // admin user-ine customers count-il ninnu ozhivaakkunnu
  const customers = users.filter((u) => u.role !== "admin");

  const totalSales = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

  const placedCount = orders.filter((o) => (o.status || "Placed") === "Placed").length;

  // puthiya 5 orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const cards = [
    { label: "Total Sales", value: `₹${totalSales}` },
    { label: "Orders", value: orders.length },
    { label: "Products", value: products.length },
    { label: "Customers", value: customers.length },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-serif mb-6">Dashboard</h2>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white border border-gray-100 rounded-md shadow-sm p-4 md:p-5"
          >
            <p className="text-xs md:text-sm text-gray-500">{c.label}</p>
            <p className="text-xl md:text-3xl font-bold text-yellow-600 mt-2">
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {placedCount > 0 && (
        <p className="mb-4 text-sm bg-yellow-50 border border-yellow-100 text-yellow-800 rounded-md px-4 py-3">
          {placedCount} new order(s) ship cheyyaan baakki undu.
        </p>
      )}

      {/* RECENT ORDERS */}
      <div className="bg-white border border-gray-100 rounded-md shadow-sm p-4 md:p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Recent Orders</h3>
          <Link to="/admin/orders" className="text-sm text-yellow-700 hover:underline">
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm">Orders onnum illa.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="py-2 pr-4 font-medium">Order</th>
                  <th className="py-2 pr-4 font-medium">Customer</th>
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Total</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 whitespace-nowrap">#{o.id}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      {o.address?.name || "-"}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      {new Date(o.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap font-medium">₹{o.total}</td>
                    <td className="py-3">
                      <span className="text-xs font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                        {o.status || "Placed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;