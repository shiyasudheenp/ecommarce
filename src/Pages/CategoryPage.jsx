import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryPage() {

    const {category}=useParams()
  return (
    <div className='p-10'>
        <h1 className='text-5xl font-bold capitalize'>
            {category}
        </h1>
    </div>
  )
}

export default CategoryPage