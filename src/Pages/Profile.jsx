import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [pwForm, setPwForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwMsg, setPwMsg] = useState({ type: "", text: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMsg({ type: "", text: "" });

    const { oldPassword, newPassword, confirmPassword } = pwForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPwMsg({ type: "error", text: "Ellaa field-um fill cheyyuka" });
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg({ type: "error", text: "New password kurachu 6 character venam" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: "error", text: "New password-um confirm password-um match aakunnilla" });
      return;
    }
    if (newPassword === oldPassword) {
      setPwMsg({ type: "error", text: "New password old password-ninnu vethyasam aayirikkanam" });
      return;
    }

    setPwLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/users");
      const dbUser = res.data.find((u) => u.email === profile.email);

      if (!dbUser) {
        setPwMsg({ type: "error", text: "User kandethaan pattiyilla. Veendum login cheyyuka" });
        return;
      }
      if (dbUser.password !== oldPassword) {
        setPwMsg({ type: "error", text: "Old password thettaanu" });
        return;
      }

      await axios.patch(`http://localhost:3001/users/${dbUser.id}`, {
        password: newPassword,
      });

      setPwMsg({ type: "success", text: "Password maatti!" });
      setPwForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      setPwMsg({ type: "error", text: "Password maattan pattiyilla. json-server run cheyyunnundo ennu nokku" });
    } finally {
      setPwLoading(false);
    }
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

      {/* CHANGE PASSWORD */}
      <div className="bg-white border border-gray-100 rounded-md shadow-sm p-4 md:p-6 mt-6">
        <h2 className="font-semibold text-lg mb-4">Change Password</h2>

        <form onSubmit={handleChangePassword} className="flex flex-col gap-4 max-w-md">
          <input
            type={showPw ? "text" : "password"}
            value={pwForm.oldPassword}
            onChange={(e) => setPwForm({ ...pwForm, oldPassword: e.target.value })}
            placeholder="Old Password"
            autoComplete="current-password"
            className="border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <input
            type={showPw ? "text" : "password"}
            value={pwForm.newPassword}
            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
            placeholder="New Password"
            autoComplete="new-password"
            className="border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <input
            type={showPw ? "text" : "password"}
            value={pwForm.confirmPassword}
            onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
            placeholder="Confirm New Password"
            autoComplete="new-password"
            className="border border-gray-200 rounded-md px-3 py-2 text-sm"
          />

          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              checked={showPw}
              onChange={() => setShowPw(!showPw)}
            />
            Show passwords
          </label>

          {pwMsg.text && (
            <p className={`text-sm ${pwMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
              {pwMsg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={pwLoading}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-md text-sm font-medium w-fit disabled:opacity-50"
          >
            {pwLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

    </div>
  );
}

export default Profile;