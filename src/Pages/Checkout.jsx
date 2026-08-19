import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const User = localStorage.getItem("user");
    if (!User) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill all delivery details");
      return;
    }

    alert("Order placed successfully!");
    navigate("/");
  };

  if (loading) {
    return <div className="text-center py-24">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-serif mb-3">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-black text-white text-center py-12 px-6">
        <h1 className="text-3xl font-serif">Checkout</h1>
      </div>

      <div className="px-6 md:px-10 py-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Delivery + Payment Form */}
          <form
            onSubmit={handlePlaceOrder}
            className="bg-white border border-gray-100 rounded-md shadow-sm p-6 md:p-8 flex flex-col gap-4"
          >
            <h2 className="text-xl font-semibold mb-2">Delivery Details</h2>

            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="2"
                placeholder="House no, street, area"
                className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:border-yellow-600"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-2">Payment Method</h2>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="text-sm">Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <span className="text-sm">Online Payment (UPI / Card)</span>
              </label>
            </div>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-md font-medium transition-all mt-4"
            >
              Place Order
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex gap-4 items-center border-b border-gray-100 pb-4 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-yellow-600 font-bold mt-1">
                  ₹{product.price}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{product.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-100 mt-3 pt-3">
              <span>Total</span>
              <span>₹{product.price}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;