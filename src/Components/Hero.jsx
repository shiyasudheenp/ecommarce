import React from 'react'
import { Link } from "react-router-dom"

function Hero() {
  return (
    <div className="bg-[#f5f1e8] py-10 md:py-16 px-4 md:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 overflow-hidden">

      {/* LEFT: text */}
      <div className="lg:flex-1">

        <p className="text-xs md:text-sm tracking-widest text-yellow-700 mb-4">
          ◈ New Collection 2026
        </p>

        <h1 className="text-4xl md:text-6xl font-serif leading-tight">
          Discover <br />
          <span className="text-yellow-600 italic">Timeless</span> <br />
          Elegance
        </h1>

        <p className="text-gray-600 mt-4 md:mt-6 max-w-md text-sm md:text-base">
          Handcrafted jewellery that celebrates life’s precious moments.
          Pure gold, certified diamonds, authentic craftsmanship from Madurai.
        </p>

        {/* Buttons */}
        <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
          <Link
            to="/Shop"
            className="bg-yellow-600 text-white px-5 md:px-6 py-3 rounded-lg text-sm md:text-base hover:bg-yellow-700 hover:scale-105 transition duration-300"
          >
            SHOP COLLECTION
          </Link>

          <Link
            to="/NewArrivals"
            className="border px-5 md:px-6 py-3 rounded-lg text-sm md:text-base hover:bg-yellow-700 hover:text-white hover:scale-105 transition duration-300"
          >
            NEW ARRIVALS
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-6 md:gap-10 mt-10 md:mt-16">
          <div>
            <h6 className="font-serif text-2xl md:text-3xl">500+</h6>
            <p className="text-gray-500 tracking-wide text-xs md:text-base">Designs</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl">10K+</h2>
            <p className="text-gray-500 tracking-wide text-xs md:text-base">Happy Customers</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl">100%</h2>
            <p className="text-gray-500 tracking-wide text-xs md:text-base">Pure Gold</p>
          </div>
        </div>

      </div>

      {/* RIGHT: images */}
      <div className="flex gap-3 md:gap-6 justify-center lg:justify-end">
        <div className="flex flex-col gap-3 md:gap-6 w-1/2 lg:w-60">
          <img
            src="/IMG-h1.jpeg"
            className="w-full h-40 md:h-60 object-cover rounded-[40px] rounded-tl-[100px] hover:scale-105 transition duration-700"
          />
          <img
            src="/IMG-h2.jpg"
            className="w-full h-40 md:h-60 object-cover rounded-2xl hover:scale-105 transition duration-700"
          />
        </div>
        <div className="flex flex-col gap-3 md:gap-6 w-1/2 lg:w-60">
          <img
            src="/IMG-h3.webp"
            className="w-full h-40 md:h-60 object-cover rounded-2xl hover:scale-105 transition duration-700"
          />
          <img
            src="/IMG-h4.jpg"
            className="w-full h-40 md:h-60 object-cover rounded-[40px] rounded-tl-[100px] hover:scale-105 transition duration-700"
          />
        </div>
      </div>

    </div>
  )
}

export default Hero;