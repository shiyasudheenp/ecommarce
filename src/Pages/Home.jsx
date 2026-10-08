import { useEffect } from "react";
import Categories from "../Components/Categories";
import Hero from "../Components/Hero";
import Product from "../Components/Product";


function Home() {

  // Login cheythittundenkil Home-il ninnu back adichu purathu pokaruthu
  useEffect(() => {
    if (!localStorage.getItem("user")) return;

    const stay = () =>
      window.history.pushState(window.history.state, "", window.location.href);

    stay();
    window.addEventListener("popstate", stay);
    return () => window.removeEventListener("popstate", stay);
  }, []);

  return (
  <div>
 
    <Hero />
    <Categories/>
    <Product/>
    
    
  </div>
  );
}

export default Home;

