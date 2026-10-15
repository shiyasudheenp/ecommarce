import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = () => {
    Promise.all([
      axios.get("http://localhost:3001/users"),
      axios.get("http://localhost:3001/orders"),
    ])
      .then(([u, o]) => {
        setUsers(u.data);
        setOrders(o.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (user) => {
    if (!window.confirm(`"${user.name}" ine delete cheyyano?`)) return;
    try {
      await axios.delete(`http://localhost:3001/users/${user.id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete cheyyan pattiyilla");
    }
  };

  // admin user-ine ozhivaakki customers mathram
  const customers = users.filter((u) => u.role !== "admin");

  // oro customer-inteyum order count-um total spend-um
  // (orders-il customer email illa, athukondu checkout-il kodutha phone number match cheythu kandupidikkunnu)
  const getStats = (user) => {
    if (!user.phone) return { count: 0, spent: 0 };
    const mine = orders.filter((o) => o.address?.phone === user.phone);
    return {
      count: mine.length,
      spent: mine.reduce((sum, o) => sum + Number(o.total || 0), 0),
    };
  };

  const q = search.trim().toLowerCase();
  const shown = customers.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.phone || "").includes(q)
  );

  if (loading) return <p className="text-gray-500">Loading users...</p>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-serif">
          Customers <span className="text-base text-gray-400">({customers.length})</span>
        </h2>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone..."
          className="border border-gray-200 rounded-md px-3 py-2 text-base sm:text-sm w-full sm:w-72 focus:outline-none focus:border-yellow-600"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Orders</th>
              <th className="p-3 font-medium">Total Spent</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Customers onnum kandilla.
                </td>
              </tr>
            )}
            {shown.map((u) => {
              const { count, spent } = getStats(u);
              return (
                <tr key={u.id} className="border-b border-gray-50 last:border-0">
                  <td className="p-3 whitespace-nowrap font-medium">{u.name}</td>
                  <td className="p-3 whitespace-nowrap">{u.email}</td>
                  <td className="p-3 whitespace-nowrap">{u.phone || "-"}</td>
                  <td className="p-3">{count}</td>
                  <td className="p-3 whitespace-nowrap">₹{spent}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(u)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;