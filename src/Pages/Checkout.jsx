
// import { useContext, useState } from "react";
// import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
// import { cartContext } from "./CartProvider";

// function Checkout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { removeFromCart } = useContext(cartContext);

//   const items = location.state?.items;

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     pincode: "",
//     city: "",
//     address: "",
//   });
//   const [errors, setErrors] = useState({});

//   if (!items || items.length === 0) {
//     return <Navigate to="/Shop" replace />;
//   }

//   const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = "Name is required";
//     if (!/^[0-9]{10}$/.test(form.phone.trim())) newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!/^[0-9]{6}$/.test(form.pincode.trim())) newErrors.pincode = "Enter a valid 6-digit pincode";
//     if (!form.city.trim()) newErrors.city = "City is required";
//     if (!form.address.trim()) newErrors.address = "Address is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePlaceOrder = () => {
//     if (!validate()) return;

//     items.forEach((item) => removeFromCart(item.id));
//     navigate("/order-success", { state: { items, total, address: form } });
//   };

//   const inputClass = (field) =>
//     `border rounded-md px-3 py-2 text-sm w-full ${
//       errors[field] ? "border-red-400" : "border-gray-200"
//     }`;

//   return (
//     <div className="px-6 md:px-10 py-10 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-serif mb-8">Checkout</h1>

//       <div className="flex flex-col gap-4 mb-8">
//         {items.map((item) => (
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
//               <p className="text-gray-500 text-sm mt-1">Qty: {item.qty}</p>
//             </div>
//             <p className="font-semibold">₹{item.price * item.qty}</p>
//           </div>
//         ))}
//       </div>

//       {/* Delivery details */}
//       <div className="bg-white border border-gray-100 rounded-md shadow-sm p-5 mb-8">
//         <h2 className="font-semibold mb-4">Delivery Address</h2>
//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className={inputClass("name")}
//             />
//             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//           </div>

//           <div>
//             <input
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               className={inputClass("phone")}
//             />
//             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//           </div>

//           <div>
//             <input
//               name="pincode"
//               value={form.pincode}
//               onChange={handleChange}
//               placeholder="Pincode"
//               className={inputClass("pincode")}
//             />
//             {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
//           </div>

//           <div>
//             <input
//               name="city"
//               value={form.city}
//               onChange={handleChange}
//               placeholder="City"
//               className={inputClass("city")}
//             />
//             {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//           </div>

//           <div className="sm:col-span-2">
//             <textarea
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//               placeholder="Address"
//               rows={2}
//               className={inputClass("address")}
//             />
//             {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between items-center border-t border-gray-100 pt-6">
//         <Link to="/Cart" className="text-sm text-gray-500 hover:text-yellow-600">
//           ← Back to Cart
//         </Link>
//         <div className="text-right">
//           <p className="text-xl font-bold mb-3">Total: ₹{total}</p>
//           <button
//             onClick={handlePlaceOrder}
//             className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;










import { useContext, useState } from "react";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { cartContext } from "./CartProvider";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeFromCart } = useContext(cartContext);

  const items = location.state?.items;

  const [form, setForm] = useState({
    name: "", phone: "", pincode: "", city: "", address: "",
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (!items || items.length === 0) {
    return <Navigate to="/Shop" replace />;
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone.trim())) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    setPlacing(true);
    const newOrder = {
      items,
      total,
      address: form,
      status: "Placed",
      date: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:3001/orders", newOrder);
      items.forEach((item) => removeFromCart(item.id));
      navigate("/order-success", { state: { order: res.data } });
    } catch (err) {
      alert("Failed to place order. Please make sure json-server is running.");
      console.error(err);
    } finally {
      setPlacing(false);
    }
  };

  const inputClass = (field) =>
    `border rounded-md px-3 py-2 text-sm w-full ${errors[field] ? "border-red-400" : "border-gray-200"}`;

  return (
    <div className="px-6 md:px-10 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif mb-8">Checkout</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-100 rounded-md shadow-sm p-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-1">
              <h2 className="font-semibold text-black-500">{item.name}</h2>
              <p className="text-yellow-600 font-bold mt-1">₹{item.price}</p>
              <p className="text-gray-500 text-sm mt-1">Qty: {item.qty}</p>
            </div>
            <p className="font-semibold">₹{item.price * item.qty}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-md shadow-sm p-5 mb-8">
        <h2 className="font-semibold mb-4">Delivery Address</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={inputClass("name")} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass("phone")} />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className={inputClass("pincode")} />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
          <div>
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputClass("city")} />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div className="sm:col-span-2">
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" rows={2} className={inputClass("address")} />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-100 pt-6">
        <Link to="/Cart" className="text-sm text-gray-500 hover:text-yellow-600">← Back to Cart</Link>
        <div className="text-right">
          <p className="text-xl font-bold mb-3">Total: ₹{total}</p>
          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-md font-medium transition-all disabled:opacity-50"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;











