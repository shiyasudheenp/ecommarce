
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Shop() {
  const{category}=useParams()
  let[products,setProducts]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/categories")
    .then((res)=>{
      let filtered=res.data.filter(
        (item)=>item.category===category
      );
      setProducts(filtered)
    })
  },[category])
  return (
    <div>
      <h1>{category}products</h1>
     
      {products.map((item)=>(
        <p key={item.id}>
          {item.Shop}
        </p>
      ))}
    </div>
    
  )
}

export default Shop