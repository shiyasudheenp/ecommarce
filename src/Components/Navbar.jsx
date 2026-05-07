// import {Link} from "react-router-dom"
// import "./Navbar.css"
// import Logo4 from "../assets/Logo4.png"


// function Navbar() {
//   return (
    
    
//     <nav className="navbar">
//         <Link to="/">
//   <img src={Logo4} alt="SHA_JEWELS" className="logo" />
// </Link>
//         <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/Shop">Shop</Link></li>
//             <li><Link to="/Collesction">Collesction</Link></li>
//             <li><Link to="/About">About</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//         </ul>
//     </nav>
//   )
// }

// export default Navbar






import { Link } from "react-router-dom"
import Logo1 from "../assets/Logo1.png"

function Navbar() {
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

      </div>
    </nav>
  )
}

export default Navbar