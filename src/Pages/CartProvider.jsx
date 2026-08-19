// import React, { createContext,useState } from 'react'
// import { useNavigate } from 'react-router-dom';

//  export const cartContext = createContext()

// function CartProvider({children}) {
//     const [cart,setCart]=useState([]);

//     const navigate = useNavigate();

//     const AddToCart=(product)=>{
//       // current user for checking in local storage
//       const User = localStorage.getItem("user");

//       // user not login
//       if(!User){

//         alert("Please Login First");

//         navigate("/login")

//         return;
//       }
//       // already login for user then add to products
//         setCart([...cart,product]);

//         alert("Product Added To Cart")
//         navigate("/cart")
//     };
//   return (
//     <cartContext.Provider
//     value={{cart,AddToCart}}
//     >
//       {children}

//     </cartContext.Provider>
//   );
// }

// export default CartProvider;



import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const cartContext = createContext()

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const AddToCart = (product) => {
    const User = localStorage.getItem("user");

    if (!User) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    navigate("/cart");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  return (
    <cartContext.Provider value={{ cart, AddToCart, removeFromCart, updateQty }}>
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;