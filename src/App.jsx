import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Shop from "./Pages/Shop"
import Collection from "./Pages/Collection"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Footer from "./Components/Footer"
import Cart from "./Pages/Cart"
import Products from "./Pages/Products"
import ProductsDetails from "./Pages/ProductsDetails"
import Categories from "./Components/Categories"
import CategoryPage from "./Pages/CategoryPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Dashboard from "./Pages/Dashboard"
import CartProvider from "./Pages/CartProvider"
import Hero from "./Components/Hero"
import WishlistProvider from "./Pages/WishlistProvider"
import Wishlist from "./Pages/Wishlist"
import Checkout from "./Pages/Checkout"
import ProductDetail from "./Pages/ProductDetail"



export default function App(){
  return(
    <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/shop/:category" element={<CategoryPage/>}/>
      <Route path="/Shop" element={<Shop/>}/>
      <Route path="/shop/:Categories" element={<Shop/>}/>
      <Route path="/Collection" element={<Collection/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/Footer" element={<Footer/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/Products" element={<Products/>}/>
      <Route path="/ProductsDetails/:category" element={<CategoryPage/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/Checkout/:id" element={<Checkout/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
    </Routes>
    <Footer/>
    </WishlistProvider>
     </CartProvider>
    </BrowserRouter> 
  )
}