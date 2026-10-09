import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
    setProfile(savedProfile);
    setForm(savedProfile);
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(form));
    setProfile(form);
    setEditing(false);
  };

  return (
        <div className="px-4 md:px-10 py-8 md:py-10 max-w-3xl mx-auto">

      {/* ACCOUNT INFO */}
      <div className="bg-white border border-gray-100 rounded-md shadow-sm p-6">
        <h2 className="font-semibold text-lg mb-4">Account Information</h2>

        {editing ? (
          <div className="flex flex-col gap-4 max-w-md">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="border border-gray-200 rounded-md px-3 py-2 text-base sm:text-sm"
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

    </div>
  );
}

export default Profile;