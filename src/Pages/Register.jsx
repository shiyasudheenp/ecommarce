import React from 'react'
 import { useState } from 'react'

function Register() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    let handledata=()=>{
        const Userdata={
            name:name,
            email:email,
            password:password
        };
        localStorage.setItem("user", JSON.stringify(Userdata));
        alert("Registration success");
    }
   
  return (
    <div
     className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80')",
      }}>
         <div className="absolute inset-0 bg-black/70"></div>
        <h1>Registration Page</h1>
        <input
         type="text"
        placeholder='Enter your name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
         />
         <br/><br/>

         <input
         type='email'
         placeholder='enter your email'
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         />
         <br/><br/>

         <input
         type='password'
         placeholder='eater your password'
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         />
         <button onClick={handledata}>Register</button>
         
    </div>
  )
}

export default Register