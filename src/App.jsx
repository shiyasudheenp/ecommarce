import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Shop from "./Pages/Shop"
import Collection from "./Pages/Collection"
import About from "./Pages/About"
import Footer from "./Components/Footer"
import Cart from "./Pages/Cart"
import Categories from "./Components/Categories"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import CartProvider from "./Pages/CartProvider"
import Hero from "./Components/Hero"
import WishlistProvider from "./Pages/WishlistProvider"
import Wishlist from "./Pages/Wishlist"
import ProductDetail from "./Pages/ProductDetail"
import Checkout from "./Pages/Checkout"
import OrderSuccess from "./Pages/OrderSuccess"
import MyOrders from "./Pages/MyOrders"
import Profile from "./Pages/Profile"
import Signup from "./Pages/Signup"
import ScrollToTop from "./Components/ScrollToTop"
import ProtectedRoute from "./Components/ProtectedRoute";

// Navbar/Footer ee routes-il kanikkaruthu
const hideLayoutRoutes = ["/login", "/register", "/Signup"];

function Layout() {
  const location = useLocation();
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Shop" element={<Shop/>}/>
        <Route path="/Shop/:category" element={<Shop/>}/>
        <Route path="/Collection" element={<Collection/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Footer" element={<Footer/>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/order-Success" element={<OrderSuccess/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
      {!hideLayout && <Footer/>}
    </>
  )
}

export default function App(){
  return(
    <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
        <Layout />
      </WishlistProvider>
     </CartProvider>
    </BrowserRouter> 
  )
}