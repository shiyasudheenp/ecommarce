// import { Link } from "react-router-dom"
// import Logo1 from "../assets/Logo1.png"
// import { FaHeart } from "react-icons/fa";
// import { GiShoppingCart } from "react-icons/gi";
// import { useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { cartContext } from "../Pages/CartProvider";
// import { wishlistContext } from "../Pages/WishlistProvider";

// function Navbar() {

//   const navigate = useNavigate();

 
//   // current login user
//   const [user,setUser] = useState(localStorage.getItem("user"));
//   console.log(user)

//   const { wishlist } = useContext(wishlistContext);

//   const {cart} =useContext(cartContext);

//   // change to page for check localstorage

//   useEffect(()=>{
//     const currentuser = localStorage.getItem("user");

//     setUser(currentuser);
//   },[location.pathname]);

//   const handleLogout = ()=>{
//     // user remove the login
//     localStorage.removeItem("user");

//     // update to navbar

//     setUser(null);

//     alert("Logout successful");

//     // move to login page

//     navigate("/login")
//   };

//      // search option
//   const [showsearch,setShowsearch]=useState(false);
//   const [searchTerm,setSearchTerm]=useState("");

//   const handlesearch = (e)=>{
//     e.preventDefault();
//     if(searchTerm.trim() === "") return;
//     navigate(`/shop?searh=${encodeURIComponent(searchTerm)}`);
//     setSearchTerm("");
//     setShowsearch(false);
//   };
  
//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//       <div className="flex justify-between  items-center h-17 w-full px-0">
        
//         {/* Logo */}
//         <Link to="/">
//           <img src={Logo1} alt="SHA JEWELS" className="h-25  w-45 mt-3  object-contain" />
//         </Link>

//         {/* Nav Links */}
//         <ul className="flex items-center gap-0 ml-1 pl-55 list-none mx-auto p-1">
//           <li>
//             <Link to="/" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
//               HOME
//               <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/Shop" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
//               SHOP
//               <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/Collection" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
//               COLLECTION
//               <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/About" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
//               ABOUT
//               <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="px-4 py-2 text-sm text-black-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200 relative group block">
//               CONTACT
//               <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
//             </Link>
//           </li>
//         </ul>

//         {/* Right side icons */}

//         <div className="flex items-center gap-5 mr-5">
//           {/* serch */}
//            {showsearch ? (
//             <form onSubmit={handlesearch} className="flex items-center">
//               <input
//                 type="text"
//                 autoFocus
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onBlur={() => setShowsearch(false)}
//                 placeholder="Search jewelry..."
//                 className="border border-gray-200 rounded-md px-3 py-1.5 text-sm w-40 sm:w-56 focus:outline-none focus:border-yellow-600"
//               />
//             </form>
//           ) : (
//             <button onClick={() => setShowsearch(true)}>🔍</button>
//           )}
          
//           {/* wishlist */}
//           <Link to="/wishlist" className="relative">
//           <FaHeart className="text-xl hover:text-yellow-600" />
//           {wishlist.length>0 &&(
//             <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//               {wishlist.length}
//             </span>
//           )}
//           </Link>
//           {/* cart */}
//           <Link to= "/cart" className="relative">
//           <GiShoppingCart className="relative text-xl hover:text-yellow-600" />
//           {cart.length > 0 &&(
//                 <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                   {cart.length}
//                </span>
//           )}
//           </Link>
//           {/* sign in */}
//           <Link to="/login">
//           {/* login / logout */}
//           {user ?(
//           <button
//             onClick={handleLogout} 
//             className="bg-yellow-600 hover:bg-yellow-300 text-white px-5 py-2 rounded-md font-medium">
//             LOGOUT
//               </button>
//             ):(
//               <button
//               onClick={()=> navigate("/login")}
//               className="bg-yellow-600 hover:bg-yellow-300 text-white px-5 py-2 rounded-md font-medium">
//                 SIGN IN
//               </button>
//             )}
//           </Link>

//         </div>

//       </div>
//     </nav>
//   )
// }

// export default Navbar;










import { Link, useNavigate, useLocation } from "react-router-dom"
import Logo1 from "../assets/Logo1.png"
import { FaHeart, FaRegUserCircle } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useContext, useState, useEffect, useRef } from "react";
import { cartContext } from "../Pages/CartProvider";
import { wishlistContext } from "../Pages/WishlistProvider";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  // current login user
  const [user, setUser] = useState(localStorage.getItem("user"));

  const { wishlist } = useContext(wishlistContext);
  const { cart } = useContext(cartContext);

  useEffect(() => {
    const currentuser = localStorage.getItem("user");
    setUser(currentuser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
    alert("Logout successful");
    navigate("/login")
  };

  // search option
  const [showsearch, setShowsearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handlesearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/shop?searh=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setShowsearch(false);
  };

  // profile popup
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // close popup when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* profile icon + popup */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setShowProfile((prev) => !prev)}>
              <FaRegUserCircle className="text-2xl hover:text-yellow-600" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-md shadow-lg p-5 z-50">
                {user ? (
                  <>
                    <p className="text-xs text-gray-400 mb-3">Signed in as</p>
                    <p className="font-semibold mb-4">{user}</p>

                    <Link
                      to="/my-orders"
                      onClick={() => setShowProfile(false)}
                      className="block text-sm py-2 px-1 hover:bg-gray-50 rounded-md transition-all"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setShowProfile(false)}
                      className="block text-sm py-2 px-1 hover:bg-gray-50 rounded-md transition-all"
                    >
                      My Wishlist
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md font-medium text-sm transition-all"
                    >
                      Logout
                    </button>
                  </>
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
    </nav>
  )
}

export default Navbar;