// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// function Product() {
//   let[items,setItems]=useState([])
//   useEffect(()=>{
//     axios.get("http://localhost:4000/product")
//     .then((res)=>setItems(res.data));
//   })

//   return (<>
//   <div>
//     {items && items.slice(0,4).map((d)=>(
//     <div key={d.id}>
//       <img src={d.image} alt="" />
//     </div>
//     ))}
//   </div>
  
//   </>    
//   )
// }

// export default Product;


import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/product")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="px-10 py-10">

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden group relative"
          >

            {/* IMAGE */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />

              {/* BADGES */}
              <div className="absolute top-3 left-3 flex gap-2">
                {item.isNew && (
                  <span className="bg-black text-white text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                {item.discount && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{item.discount}%
                  </span>
                )}
              </div>

              {/* ICONS */}
              <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white p-2 rounded-full shadow">
                  ❤️
                </button>
                <button className="bg-white p-2 rounded-full shadow">
                  🛒
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-4">
              <p className="text-xs text-g ray-400 uppercase">
                {item.category}
              </p>

              <h2 className="font-semibold text-lg">
                {item.name}
              </h2>

              {/* RATING */}
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                {"★".repeat(item.rating)}
                <span className="text-gray-500 text-xs">
                  ({item.reviews})
                </span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-lg">
                  ₹{item.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{item.oldPrice}
                </span>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Products;