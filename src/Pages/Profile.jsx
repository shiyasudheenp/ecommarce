import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("account"); // "account" | "orders"

  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
    setProfile(savedProfile);
    setForm(savedProfile);

    axios.get("http://localhost:3001/orders").then((res) => {
      setOrders(res.data.reverse());
      setLoading(false);
    });
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(form));
    setProfile(form);
    setEditing(false);
  };

  return (
    <div className="px-6 md:px-10 py-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">

      {/* SIDEBAR */}
      <div className="w-full md:w-56 flex-shrink-0">
        <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
          <button
            onClick={() => setActiveTab("account")}
            className={`w-full text-left px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "account" ? "bg-black text-white" : "hover:bg-gray-50"
            }`}
          >
            My Account
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-3 text-sm font-medium transition-all border-t border-gray-100 ${
              activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-50"
            }`}
          >
            My Orders
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* ACCOUNT INFO */}
        {activeTab === "account" && (
          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Account Information</h2>

            {editing ? (
              <div className="flex flex-col gap-4 max-w-md">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name"
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone"
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-md text-sm font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setEditing(false); setForm(profile); }}
                    className="border border-gray-300 px-5 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-medium">{profile.name || "Add your name"}</p>
                <p className="text-gray-500 text-sm mt-1">{profile.email || "Add your email"}</p>
                <p className="text-gray-500 text-sm">{profile.phone || "Add your phone"}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-4 text-yellow-700 text-sm font-medium hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        )}

        {/* MY ORDERS */}
        {activeTab === "orders" && (
          loading ? (
            <p className="text-gray-500 text-center py-10">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No orders yet.</p>
          ) : (
            <div className="flex flex-col gap-5">
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
          )
        )}
      </div>
    </div>
  );
}

export default Profile;