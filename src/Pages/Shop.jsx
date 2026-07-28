import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "./CartProvider";

function Shop() {
  const [products, setProducts] = useState([]);
  const { AddToCart } = useContext(cartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="text-lg font-semibold mt-2">
              {product.name}
            </h3>

            <p>⭐ {product.rating}</p>

            <p className="text-green-600 font-bold">
              ₹{product.price}
            </p>

            <button
              onClick={() => {
                AddToCart(product);
                navigate("/cart");
              }}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-600"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;