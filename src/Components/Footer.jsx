import {Link} from "react-router-dom"
import Logo2 from "../assets/Logo2.png"
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-12">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div className="max-w-sm space-y-4">
           <Link to="/" className="">
           <img src={Logo2} alt="Logo1" className=""></img>
          </Link>
          <p className="text-gray-400 leading-relaxed">Shaa jewels is a Trusted Ornaments and Jewellery Brand Dedicated to Bringing Elegance,Quality,and timeless Beauty to Every Customer
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            <div className="border border-gray-600 p-3 rounded-full hover:bg-yellow-500 hover:text-black cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="border border-gray-600 p-3 rounded-full hover:bg-yellow-500 hover:text-black cursor-pointer">
              <FaInstagram />
            </div>
            <div className="border border-gray-600 p-3 rounded-full hover:bg-yellow-500 hover:text-black cursor-pointer">
              <FaTwitter />
            </div>
          </div>
        </div>

        {/* SHOP */}
        <div className="space-y-3">
          <h3 className="text-yellow-500 font-semibold tracking-widest">SHOP</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/Shop">Necklaces</Link></li>
            <li><Link to="/Shop">Earrings</Link></li>
            <li><Link to="/Shop">Bangles</Link></li>
            <li><Link to="/Shop">Bracelet</Link></li>
            <li><Link to="/Shop">Rings</Link></li>
            <li><Link to="/Shop">New Arrivals</Link></li>
            <li><Link to="/Shop?filtter=Sale">Sale</Link></li>
          </ul>
        </div>

        {/* HELP */}
        <div className="space-y-3">
          <h3 className="text-yellow-500 font-semibold tracking-widest">HELP</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/Profil">My Account</Link></li>
            <li><Link to="/Orders" >Track Order</Link></li>
            <li>Return Policy</li>
            <li>Shipping Info</li>
            <li>Size Guide</li>
            <li>Care Instructions</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-4">
          <h3 className="text-yellow-500 font-semibold tracking-widest">CONTACT</h3>

          <div className="flex items-start gap-3 text-gray-400">
            <FaLocationDot className="text-yellow-500 mt-1" />
            <p>123 Gold Street, malappuram, kerala 625001</p>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <FaPhone className="text-yellow-500" />
            <p>+91 98765 43210</p>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <MdEmail className="text-yellow-500" />
            <p>hello@shaajewels.com</p>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <FaClock className="text-yellow-500" />
            <p>Mon–Sat: 10am – 7pm</p>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <p className="text-gray-500 text-sm">
          © 2025 Shaa Jewels. All rights reserved.
        </p>

        {/* Payment */}
        <div className="flex gap-4">
          <span className="border border-gray-700 px-4 py-1 rounded-md text-sm">UPI</span>
          <span className="border border-gray-700 px-4 py-1 rounded-md text-sm">Cards</span>
          <span className="border border-gray-700 px-4 py-1 rounded-md text-sm">NetBanking</span>
          <span className="border border-gray-700 px-4 py-1 rounded-md text-sm">EMI</span>
        </div>

        {/* Links */}
        <div className="flex gap-4 text-gray-500 text-sm">
          <p className="hover:text-white cursor-pointer">Privacy</p>
          <p className="hover:text-white cursor-pointer">Terms</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;