import { useContext } from "react";
import { cartContext } from "./CartProvider";

function Cart() {

  const { cart } = useContext(cartContext);

  return (
    <div>
      <h1>Cart Page</h1>
      {Cart.map((item)=>(
        <div key={item.id}>
          <h3>{item.name}</h3>
            <p>${cart.length}</p>
        </div>
      

      ))}
    
    </div>
  );
}

export default Cart;
