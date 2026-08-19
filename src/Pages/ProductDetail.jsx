import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { cartContext } from "./CartProvider";
import { wishlistContext } from "./WishlistProvider";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { AddToCart } = useContext(cartContext);
  const { toggleWishlist, isWishlisted } = useContext(wishlistContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-24">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-serif mb-3">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-14 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="bg-gray-50 rounded-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-gray-400 uppercase mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-serif mb-3">{product.name}</h1>
          <p className="text-2xl text-yellow-600 font-bold mb-4">
            ₹{product.price}
          </p>

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => AddToCart(product)}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-md font-medium transition-all"
            >
              Add To Cart
            </button>
            <button
              onClick={() => navigate(`/checkout/${product.id}`)}
              className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium transition-all"
            >
              BUY NOW
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="w-12 flex items-center justify-center border border-gray-200 rounded-md"
            >
              <FaHeart
                className={
                  isWishlisted(product.id) ? "text-red-500" : "text-gray-300"
                }
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;