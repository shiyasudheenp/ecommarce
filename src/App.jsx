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
import NewArrivals from "./Pages/NewArrivals"
import ScrollToTop from "./Components/ScrollToTop"
import AdminRoute from "./Admin/AdminRoute";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminUsers from "./Admin/AdminUsers";

// Navbar/Footer ee routes-il kanikkaruthu
const hideLayoutRoutes = ["/login", "/register", "/Signup"];

function Layout() {
  const location = useLocation();
    const hideLayout =
    hideLayoutRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

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
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/order-Success" element={<OrderSuccess/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/NewArrivals" element={<NewArrivals/>}/>
        <Route
          path="/admin"
          element={
             <AdminRoute>
               <AdminLayout />
              </AdminRoute>
  }
>
    <Route index element={<Dashboard />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="users" element={<AdminUsers />} />
</Route>
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