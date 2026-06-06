import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

function Featured() {
    const[products,setProducts]=useState([])
    useEffect(()=>{
        axios.get(" http://localhost:3001/product")
        .then ((res)=> setProducts(res.data));
    },[])
  return (
    <div>
      

    </div>
  )
}

export default Featured