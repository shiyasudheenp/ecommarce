import { Link } from "react-router-dom"
import Logo1 from "../assets/Logo1.png"
import { FaHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cartContext } from "../Pages/CartProvider";
import { wishlistContext } from "../Pages/WishlistProvider";

function Navbar() {

  const navigate = useNavigate();

 
  // current login user
  const [user,setUser] = useState(localStorage.getItem("user"));
  console.log(user)

  const { wishlist } = useContext(wishlistContext);

  const {cart} =useContext(cartContext);

  // change to page for check localstorage

  useEffect(()=>{
    const currentuser = localStorage.getItem("user");

    setUser(currentuser);
  },[location.pathname]);

  const handleLogout = ()=>{
    // user remove the login
    localStorage.removeItem("user");

    // update to navbar

    setUser(null);

    alert("Logout successful");

    // move to login page

    navigate("/login")
  };

     // search option
  const [showsearch,setShowsearch]=useState(false);
  const [searchTerm,setSearchTerm]=useState("");

  const handlesearch = (e)=>{
    e.preventDefault();
    if(searchTerm.trim() === "") return;
    navigate(`/shop?searh=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setShowsearch(false);
  };
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex justify-between  items-center h-17 w-full px-0">
        
        {/* Logo */}
        <Link to="/">
          <img src={Logo1} alt="SHA JEWELS" className="h-25  w-45 mt-3  object-contain" />
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-0 ml-1 pl-55 list-none mx-auto p-1">
          <li>
            <Link to="/" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
              HOME
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/Shop" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
              SHOP
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/Collection" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
              COLLECTION
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/About" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
              ABOUT
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
              CONTACT
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
            </Link>
          </li>
        </ul>

        {/* Right side icons */}

        <div className="flex items-center gap-5 mr-5">
          {/* serch */}
           {showsearch ? (
            <form onSubmit={handlesearch} className="flex items-center">
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setShowsearch(false)}
                placeholder="Search jewelry..."
                className="border border-gray-200 rounded-md px-3 py-1.5 text-sm w-40 sm:w-56 focus:outline-none focus:border-yellow-600"
              />
            </form>
          ) : (
            <button onClick={() => setShowsearch(true)}>🔍</button>
          )}
          
          {/* wishlist */}
          <Link to="/wishlist" className="relative">
          <FaHeart className="text-xl hover:text-yellow-600" />
          {wishlist.length>0 &&(
            <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
          </Link>
          {/* cart */}
          <Link to= "/cart" className="relative">
          <GiShoppingCart className="relative text-xl hover:text-yellow-600" />
          {cart.length > 0 &&(
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
               </span>
          )}
          </Link>
          {/* sign in */}
          <Link to="/login">
          {/* login / logout */}
          {user ?(
          <button
            onClick={handleLogout} 
            className="bg-yellow-600 hover:bg-yellow-300 text-white px-5 py-2 rounded-md font-medium">
            LOGOUT
              </button>
            ):(
              <button
              onClick={()=> navigate("/login")}
              className="bg-yellow-600 hover:bg-yellow-300 text-white px-5 py-2 rounded-md font-medium">
                SIGN IN
              </button>
            )}
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar;