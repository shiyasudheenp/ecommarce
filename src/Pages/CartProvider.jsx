import React, { createContext,useState } from 'react'

 export const cartContext = createContext()
function CartProvider({children}) {
    const [cart,setCart]=useState([])

    const AddToCart=(product)=>{
        setCart([...cart,product])
    };
  return (
    <cartContext.Provider
    value={{cart,AddToCart}}
    >
      {children}

    </cartContext.Provider>
  );
}

export default CartProvider;