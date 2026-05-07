import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Shop from "./Pages/Shop"
import Collections from "./Pages/Collections"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Footer from "./Components/Footer"
import Cart from "./Pages/Cart"
import Products from "./Pages/Products"
import ProductsDetails from "./Pages/ProductsDetails"
import Categories from "./Components/Categories"
import CategoryPage from "./Pages/CategoryPage"


export default function App(){
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/" element={<Categories/>}/>
      <Route path="/shop/:category" element={<CategoryPage/>}/>
      <Route path="/Shop" element={<Shop/>}/>
      <Route path="/shop/:Categories" element={<Shop/>}/>
      <Route path="/Collesction" element={<Collections/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/Footer" element={<Footer/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/Products" element={<Products/>}/>
      <Route path="/ProductsDetails" element={<ProductsDetails/>}/>
      <Route path="/Contact" element={<Contact/>}/>

    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}