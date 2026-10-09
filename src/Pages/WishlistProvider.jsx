import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const wishlistContext = createContext()

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);

  const navigate = useNavigate();

  const toggleWishlist = (product) => {
    const User = localStorage.getItem("user");

    if (!User) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <wishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export default WishlistProvider;