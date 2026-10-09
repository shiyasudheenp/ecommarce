import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import Logo1 from "../assets/Logo1.png"
import { FaHeart, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useContext, useState, useEffect, useRef } from "react";
import { cartContext } from "../Pages/CartProvider";
import { wishlistContext } from "../Pages/WishlistProvider";

const navLinks = [
  { label: "All", path: "/shop" },
  { label: "Necklace", path: "/shop/necklace" },
  { label: "Earrings", path: "/shop/earrings" },
  { label: "Bangles", path: "/shop/bangles" },
  { label: "Bracelets", path: "/shop/bracelets" },
  { label: "Rings", path: "/shop/rings" },
  { label: "Anklets", path: "/shop/anklets" },
];

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(localStorage.getItem("user"));

  const { wishlist } = useContext(wishlistContext);
  const { cart } = useContext(cartContext);

  useEffect(() => {
    const currentuser = localStorage.getItem("user");
    setUser(currentuser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    setUser(null);
    setShowProfile(false);
    alert("Logout successful");
    navigate("/login")
  };

  // ---------------- SEARCH + SUGGESTIONS ----------------
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const q = searchTerm.trim().toLowerCase();

  let categorySuggestions = [];
  let productSuggestions = [];

  if (q) {
    const categories = [
      ...new Set(
        allProducts
          .map((p) => p.category && p.category.trim().toLowerCase())
          .filter(Boolean)
      ),
    ];
    categorySuggestions = categories.filter((c) => c.startsWith(q));

    const seenNames = new Set();
    productSuggestions = allProducts
      .filter((p) => {
        const nameLower = p.name.toLowerCase();
        return q.includes(" ")
          ? nameLower.includes(q)
          : nameLower.split(/[^a-z0-9]+/).some((w) => w.startsWith(q));
      })
      .filter((p) => {
        if (seenNames.has(p.name)) return false;
        seenNames.add(p.name);
        return true;
      })
      .slice(0, 5);
  }

  const hasSuggestions =
    categorySuggestions.length > 0 || productSuggestions.length > 0;

  const closeSuggestions = () => setShowSuggestions(false);

  const handlesearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/Shop?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    closeSuggestions();
  };

  const goToCategory = (cat) => {
    navigate(`/Shop/${cat}`);
    setSearchTerm("");
    closeSuggestions();
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    setSearchTerm("");
    closeSuggestions();
  };

  useEffect(() => {
       const handleClickOutside = (e) => {
      const insideDesktop = searchRef.current && searchRef.current.contains(e.target);
      const insideMobile = mobileSearchRef.current && mobileSearchRef.current.contains(e.target);
      if (!insideDesktop && !insideMobile) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------- PROFILE POPUP ----------------
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
          const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search bar (desktop-lum mobile-lum ore code, athukondu oru variable aakki)
    const renderSearchBox = (refToUse) => (
    <form ref={refToUse} onSubmit={handlesearch} className="w-full">
    
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeSuggestions();
          }}
          placeholder="Search jewelry..."
          autoComplete="off"
          className="w-full border border-gray-200 rounded-md pl-4 pr-10 py-2 md:py-2.5 text-sm focus:outline-none focus:border-yellow-600"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-600">
          <FaSearch size={14} />
        </button>

        {showSuggestions && hasSuggestions && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">

            {categorySuggestions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => goToCategory(cat)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-gray-50"
              >
                <span className="capitalize font-medium">{cat}</span>
                <span className="text-xs text-gray-400">Category</span>
              </button>
            ))}

            {productSuggestions.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goToProduct(p.id)}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50"
              >
                <img src={p.image} alt="" className="w-8 h-8 object-cover rounded" />
                <span className="flex-1 truncate">{p.name}</span>
                <span className="text-gray-500">₹{p.price}</span>
              </button>
            ))}

          </div>
        )}
      </div>
    </form>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">

      {/* TOP ROW: Logo + Search (desktop) + Icons */}
      <div className="flex items-center justify-between gap-3 md:gap-6 px-4 md:px-10 h-16 md:h-20">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={Logo1} alt="SHA JEWELS" className="h-12 md:h-16 w-auto object-contain" />
        </Link>

        {/* Search: desktop-il mathram ivide */}
           <div className="flex-1 max-w-xl hidden md:block">
          {renderSearchBox(searchRef)}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">

          {/* wishlist */}
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-xl hover:text-yellow-600" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* cart */}
          <Link to="/cart" className="relative">
            <GiShoppingCart className="relative text-xl hover:text-yellow-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* profile icon + popup */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setShowProfile((prev) => !prev)}>
              <FaRegUserCircle className="text-2xl hover:text-yellow-600" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-60 md:w-64 bg-white border border-gray-100 rounded-md shadow-lg p-5 z-50">
                {user ? (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Welcome</p>
                    <p className="font-semibold mb-5">
                      Hi {JSON.parse(localStorage.getItem("profile") || "{}").name || "there"}
                    </p>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { setShowProfile(false); navigate("/profile"); }}
                        className="w-full border border-gray-300 hover:border-yellow-600 py-2 rounded-md text-sm font-medium transition-all"
                      >
                        My Account
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md text-sm font-medium transition-all"
                      >
                        Logout
                      </button>
                      <button
                        onClick={() => { setShowProfile(false); navigate("/my-orders"); }}
                        className="w-full border border-gray-300 hover:border-yellow-600 py-2 rounded-md text-sm font-medium transition-all"
                      >
                        My Orders
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-center font-semibold mb-1">MY ACCOUNT</h3>
                    <p className="text-center text-xs text-gray-400 mb-4">
                      Login to access your account
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setShowProfile(false); navigate("/login"); }}
                        className="flex-1 border border-gray-300 hover:border-yellow-600 py-2 rounded-md text-sm font-medium transition-all"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => { setShowProfile(false); navigate("/signup"); }}
                        className="flex-1 border border-gray-300 hover:border-yellow-600 py-2 rounded-md text-sm font-medium transition-all"
                      >
                        Signup
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE SEARCH ROW: mobile-il mathram, logo-inte thazhe */}
      {/* Note: searchRef rendu idathu use cheyyunnathu kondu, mobile-um desktop-um orumichu kaanilla (CSS kondu ondu mathram visible) */}
            <div className="md:hidden px-4 pb-3">
        {renderSearchBox(mobileSearchRef)}
      </div>

      {/* BOTTOM ROW: Nav Links (mobile-il side-lekku scroll cheyyam) */}
      <div className="bg-[#f3e8d8] border-t border-gray-200">
        <ul className="flex items-center md:justify-center gap-6 md:gap-8 list-none py-2.5 px-4 overflow-x-auto whitespace-nowrap">
          {navLinks.map(({ label, path }) => (
            <li key={path} className="flex-shrink-0">
              <Link
                to={path}
                className="px-2 py-1 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-all"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  )
}

export default Navbar;