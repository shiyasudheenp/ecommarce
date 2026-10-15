import { NavLink, Outlet, useNavigate } from "react-router-dom";

const links = [
  { label: "Dashboard", path: "/admin" },
  { label: "Products", path: "/admin/products" },
  { label: "Orders", path: "/admin/orders" },
  { label: "Users", path: "/admin/users" },
];

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("profile");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* SIDEBAR */}
      <aside className="md:w-56 bg-black text-white p-4 md:p-6 flex md:flex-col gap-4 overflow-x-auto">
        <h1 className="text-yellow-500 font-serif text-lg whitespace-nowrap md:mb-4">
          Shaa Admin
        </h1>

        {links.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `text-sm whitespace-nowrap px-3 py-2 rounded-md ${
                isActive ? "bg-yellow-600 text-white" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="text-left text-sm text-red-400 hover:text-red-300 px-3 py-2 md:mt-auto whitespace-nowrap"
        >
          Logout
        </button>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;