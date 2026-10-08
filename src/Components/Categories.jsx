
import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
  const categories = [
    {
      id: 1,
      name: "Necklace",
      key: "necklace",
      image: "/Col1.jpeg",
      link: "/shop/necklace",
    },
    {
      id: 2,
      name: "Earrings",
      key: "earrings",
      image: "/col5.jpeg",
      link: "/shop/earrings",
    },
    {
      id: 3,
      name: "Bangles",
      key: "bangles",
      image: "/col4.jpeg",
      link: "/shop/bangles",
    },
    {
      id: 4,
      name: "Bracelets",
      key: "bracelets",
      image: "/col6.webp",
      link: "/shop/bracelets",
    },
    {
      id: 5,
      name: "Rings",
      key: "rings",
      image: "/col2.jpg",
      link: "/shop/rings",
    },
    {
      id: 6,
      name: "Anklets",
      key: "anklets",
      image: "/col3.jpeg",
      link: "/shop/necklace",
    },
  ]

  return (
    <div className="bg-[#f7f4ef] py-20">
      {/* Heading */}
      <div className="text-center">
        <p className="text-yellow-700 tracking-[5px] uppercase text-sm">
          BROWSE BY
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-4">
          Our Collections
        </h1>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 px-5">
        {categories.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className="relative block h-72 rounded-2xl overflow-hidden group shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-serif mb-1">{item.name}</h2>
              <span className="text-sm underline underline-offset-4 group-hover:text-yellow-400 transition-colors">
                EXPLORE →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories;










