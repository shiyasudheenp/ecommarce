import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/products";
const categories = ["necklace", "earrings", "bangles", "bracelets", "rings", "anklets"];

const emptyForm = {
  name: "",
  category: "necklace",
  price: "",
  oldPrice: "",
  image: "",
  description: "",
  trending: false,
  isNew: false,
};

const inputClass =
  "border border-gray-200 rounded-md px-3 py-2 text-base sm:text-sm w-full focus:outline-none focus:border-yellow-600";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // edit cheyyunna product (null = puthiyathu)
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProducts = () => {
    axios
      .get(API)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || "",
      category: p.category || "necklace",
      price: p.price ?? "",
      oldPrice: p.oldPrice ?? "",
      image: p.image || "",
      description: p.description || "",
      trending: !!p.trending,
      isNew: !!p.isNew,
    });
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Product name venam");
    if (!form.price || Number(form.price) <= 0) return setError("Sheriyaaya price kodukkuka");
    if (!form.image.trim()) return setError("Image path allenkil URL venam");

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      image: form.image.trim(),
      description: form.description.trim(),
      trending: form.trending,
      isNew: form.isNew,
    };

    setSaving(true);
    try {
      if (editing) {
        await axios.patch(`${API}/${editing.id}`, payload);
      } else {
        // puthiya id = ippo ulla ettavum valiya number + 1 (Shop-ile "New Arrival" sort work aakan)
        const nums = products.map((p) => Number(p.id)).filter((n) => !isNaN(n));
        const nextId = String((nums.length ? Math.max(...nums) : 0) + 1);
        await axios.post(API, { id: nextId, ...payload, rating: 4, reviews: 0 });
      }
      closeForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Save cheyyan pattiyilla. json-server run cheyyunnundo ennu nokku");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`"${p.name}" delete cheyyano?`)) return;
    try {
      await axios.delete(`${API}/${p.id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete cheyyan pattiyilla");
    }
  };

  const toggleFlag = async (p, field) => {
    try {
      await axios.patch(`${API}/${p.id}`, { [field]: !p[field] });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const shown = products
    .filter((p) => filterCat === "all" || (p.category || "").toLowerCase() === filterCat)
    .filter((p) => (p.name || "").toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => Number(b.id) - Number(a.id));

  if (loading) return <p className="text-gray-500">Loading products...</p>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-serif">
          Products <span className="text-base text-gray-400">({products.length})</span>
        </h2>
        <button
          onClick={openAdd}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-md text-sm font-medium w-full sm:w-auto"
        >
          + Add Product
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className={inputClass}
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className={`${inputClass} sm:w-48 capitalize bg-white`}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100">
              <th className="p-3 font-medium">Image</th>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Trending</th>
              <th className="p-3 font-medium">New</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Product onnum kandilla.
                </td>
              </tr>
            )}
            {shown.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0">
                <td className="p-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                </td>
                <td className="p-3 min-w-[160px]">{p.name}</td>
                <td className="p-3 capitalize whitespace-nowrap">{p.category}</td>
                <td className="p-3 whitespace-nowrap">
                  ₹{p.price}
                  {p.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">₹{p.oldPrice}</span>
                  )}
                </td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={!!p.trending}
                    onChange={() => toggleFlag(p, "trending")}
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={!!p.isNew}
                    onChange={() => toggleFlag(p, "isNew")}
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="p-3 whitespace-nowrap">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-yellow-700 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={closeForm}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">
                {editing ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={closeForm} className="text-gray-400 hover:text-black text-xl">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                className={inputClass}
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`${inputClass} capitalize bg-white`}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price (₹)"
                  className={inputClass}
                />
                <input
                  name="oldPrice"
                  type="number"
                  min="0"
                  value={form.oldPrice}
                  onChange={handleChange}
                  placeholder="Old price (optional)"
                  className={inputClass}
                />
              </div>

              <div>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Image path (/IMG_21.PNG) allenkil URL"
                  className={inputClass}
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-md mt-2 border border-gray-100"
                  />
                )}
              </div>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description (optional)"
                rows={3}
                className={inputClass}
              />

              <div className="flex gap-6 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="trending"
                    checked={form.trending}
                    onChange={handleChange}
                  />
                  Trending
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={form.isNew}
                    onChange={handleChange}
                  />
                  New Arrival
                </label>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {saving ? "Saving..." : editing ? "Update" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 border border-gray-300 py-2.5 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;