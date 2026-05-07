import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
  const categories=[
    {
        "id":1,
        "name":"Necklace",
         "key": "necklace",
      "icon": "💍",
      "desc": "Timeless gold pieces",
       "link": "/shop/necklace"
      
      
      },
       {
        "id":2,
        "name":"Earrings",
         "key": "earrings",
         "icon": "✨",
         "desc": "Statement designs",
          "link": "/shop/earrings"
      },
       {
        "id":3,
        "name":"Bangles",
         "key": "bangles",
         "icon": "💛",
         "desc": "Traditional charm",
          "link": "/shop/bangles"
      },
       {
        "id":4,
        "name":"Bracelets",
         "key": "bracelets",
      "icon": "🌟",
      "desc": "Elegant wraps",
       "link": "/shop/bracelets"
      },
       {
        "id":5,
        "name":"Rings",
         "key": "rings",
      "icon": "💍",
      "desc": "Forever pieces",
       "link": "/shop/rings"
      },
       {
        "id":6,
        "name":"Anklets",
         "key": "anklets",
      "icon": "🌸",
      "desc": "Delicate beauty",
       "link": "/shop/necklace"
      }

  ]
  return (
    <div className="bg-[#f7f4ef] py-20">
      {/* {Heading} */}

      <div className="text-center">
        <p className='text-yellow-700 tracking-[5px] uppercase text-sm'> BROWSE BY
        </p>
        <h1 className='text-6x1 font-serif mt-4'>
          Our Collections
          </h1>
      </div>

         {/* Categories Grid */}

         <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-16 px-5'>
          {categories.map((item)=>(
            <Link to={item.link} key={item.id}>
              <div className='bg-white border rounded-3xl p-10 text-center hover:border-yellow-600 hover:shadow-lg duration-300'>
                <h1 className='text-5xl'>
                  {item.icon}
                </h1>
                <h2 className='text-2xl mt-5 font-serif'>
                  {item.name}
                </h2>
                <p className='text-gray-500 mt-2'>
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
         </div>


      

    </div>
  )
}

export default Categories;