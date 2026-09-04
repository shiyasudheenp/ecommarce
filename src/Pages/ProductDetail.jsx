
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
  const [showModal, setShowModal] = useState(false);
  const [qty, setQty] = useState(1);

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
    return (
      <div className="text-center py-24">
        <div className="inline-block w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-serif mb-3">Product Not Found</h1>
        <button
          onClick={() => navigate("/shop")}
          className="bg-yellow-600 text-white px-6 py-2 rounded-md"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-14 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT - Image */}
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* RIGHT - Details */}
        <div>

          {/* Category + Badge */}
          <div className="flex items-center gap-3 mb-2">
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              {product.category}
            </p>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
              10% OFF
            </span>
          </div>

          {/* Name */}
          <h1 className="text-3xl font-serif mb-3">{product.name}</h1>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-500 text-lg">
              ★★★★☆
            </div>
            <span className="text-sm text-gray-400">(128 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5">
            <p className="text-2xl text-yellow-600 font-bold">
              ₹{product.price}
            </p>
            <p className="text-gray-400 line-through text-sm">
              ₹{Math.round(product.price * 1.1)}
            </p>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
              Save ₹{Math.round(product.price * 0.1)}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-5">
              {product.description}
            </p>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm text-gray-500 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-lg font-medium"
              >
                −
              </button>
              <span className="px-5 py-2 text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-lg font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-5 flex items-center gap-3">
            <span className="text-2xl">🚚</span>
            <div>
              <p className="text-sm font-medium text-green-700">Free Delivery</p>
              <p className="text-xs text-green-600">Delivered in 3-5 business days</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => AddToCart(product)}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-md font-medium transition-all"
            >
              Add To Cart
            </button>
            <button
              onClick={() => {
                const isLoggedIn = localStorage.getItem("user");
                if (isLoggedIn) {
                  setShowModal(true);
                } else {
                  alert("Please login to continue!");
                  navigate("/login");
                }
              }}
              className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium transition-all"
            >
              BUY NOW
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="w-12 flex items-center justify-center border border-gray-200 rounded-md hover:border-red-300 transition-all"
            >
              <FaHeart
                className={
                  isWishlisted(product.id) ? "text-red-500" : "text-gray-300"
                }
              />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-5">
            <div className="text-center">
              <p className="text-2xl mb-1">✅</p>
              <p className="text-xs text-gray-500">100% Original</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1">🔄</p>
              <p className="text-xs text-gray-500">Easy Return</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1">🔒</p>
              <p className="text-xs text-gray-500">Secure Payment</p>
            </div>
          </div>

        </div>
      </div>

      {/* BUY NOW MODAL */}
      {showModal && product && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="flex justify-end p-3">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-black text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover"
            />

            {/* Info */}
            <div className="p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {product.category}
              </p>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {product.name}
              </h2>
              <p className="text-yellow-600 font-bold text-xl mb-3">
                ₹{product.price}
              </p>

              {product.description && (
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Badges */}
              <div className="flex gap-2 mb-5">
                <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100">
                  ✓ In Stock
                </span>
                <span className="bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-full border">
                  🚚 Free Delivery
                </span>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    AddToCart(product);
                    setShowModal(false);
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 rounded-lg font-medium transition-all"
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    navigate(`/checkout/${product.id}`);
                  }}
                  className="flex-1 bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-all"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;