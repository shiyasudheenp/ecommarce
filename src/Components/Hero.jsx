 import React from 'react'
 import {Link} from "react-router-dom"


function Hero() {
  return (
 <div className='bg-[#f5f1e8] py-16 flex items-start justify- px-10'>
    <div className='' >

        <p className='text-sm tracking-widest text-yellow-700 mb-4'>◈ New Collection 2026</p>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
    Discover <br />
    <span className="text-yellow-600 italic">Timeless</span> <br />
    Elegance
  </h1>
   <p className="text-gray-600 mt-6 max-w-md">
    Handcrafted jewellery that celebrates life’s precious moments.
    Pure gold, certified diamonds, authentic craftsmanship from Madurai.
  </p>
    {/* Buttons */}
  <div className="mt-8 flex gap-4">
    <Link to="/Shop" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 hover:scale-105 transition duration-300">
      SHOP COLLECTION
    </Link>

   <Link to="/NewArrivals" className="border px-6 py-3 rounded-lg hover:bg-yellow-700 hover:scale-105 transition duration-300" >
      NEW ARRIVALS
    
    </Link>

   </div>

    <div className='flex   gap-10  justify-self-start mt-16 '>
      <div className=''>
        <h6 className='font-serif text-4x0'>500+</h6>
        <p className='text-gray-500 tracking-wide'>Designs</p>

      </div>
      <div className=''>
        <h2 className='font-serif text-4x0'>10K+</h2>
        <p className='text-gray-500 tracking-wide'>Happy Customers</p>

      </div>
      <div className=''>
        <h2 className='font-serif text-4x0'>100%</h2>
        <p className='text-gray-500 tracking-wide'>Pure Gold</p>

      </div>
    </div>


    </div>
    <div className='flex   gap-10  justify-self-end  '>
        <div className='ml-20'>
             <img src="/IMG-h1.jpeg" className="rounded-2xl w-75 h-60 mb-10 scale-105 hover:scale-110 transition duration-700 rounded-[40px] rounded-tl-[120px]  " />
             <img src="/IMG-h2.jpg" className="rounded-2xl w-70 h-60  scale-105 hover:scale-110 transition duration-700" />
        </div>
        <div className=''>
             <img src="/IMG-h3.webp" className="rounded-2xl w-80 h-60 mb-10 scale-105 hover:scale-110 transition duration-700" />
            <img src="/IMG-h4.jpg" className="rounded-2xl w-80 h-60 scale-105 hover:scale-110 transition duration-700 rounded-[40px] rounded-tl-[120px]" />
        </div>

          

    </div>
 </div>
  )
}

export default Hero 











