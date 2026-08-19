import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Collection() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="bg-black text-white text-center py-16 px-6">
        <h1 className="text-4xl font-serif mb-3">Explore Our Collections</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Handpicked jewelry crafted to bring elegance, quality and timeless
          beauty to every customer.
        </p>
      </div>

      {/* Category Grid */}
      <div className="px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/Shop/${item.key}`)}
              className="cursor-pointer bg-white border border-gray-100 rounded-md shadow-sm p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
              <span className="inline-block text-yellow-600 font-medium text-sm hover:underline">
                Shop Now →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;