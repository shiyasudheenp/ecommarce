import React from 'react'
 import { useState, useEffect } from 'react'
 import {useNavigate} from 'react-router-dom'
 import axios from 'axios'

function Register() {
  const navigate= useNavigate()

  // Already login aanenkil register page kaanikkanda, home-ilekku vidum
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/", { replace: true });
    }
  }, [navigate])

    const[name,setName]=useState("")
     const[phone,setPhone]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[showpassword,setShowpaswword]=useState(false)

   

    const handleData = async (e) => {

e.preventDefault();

if (!/^[0-9]{10}$/.test(phone.trim())) {
  alert("Enter a valid 10-digit phone number");
  return;
}

try {
const response = await axios.get(
  " http://localhost:3001/users"
);

const existingUser = response.data.find(
  (user) => user.email === email
);

if (existingUser) {

  alert("Email already registered");
  return;
}

const userData = {
  name,
  email,
  phone: phone.trim(),
  password
};

await axios.post(
  " http://localhost:3001/users",
  userData
);

alert("Registration success");
navigate("/login", { replace: true });


} catch (error) {


console.log(error);
alert("Registration failed");


}
};
 
  return (
    <div
     className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80')",
      }}>
       <div className="relative z-10 bg-[#3d3d3d]/90 border border-yellow-600 rounded-3xl p-8 w-[380px] shadow-2xl">

  <h1 className="text-4xl font-bold text-yellow-500 text-center mb-2">
    Register
  </h1>

  <p className="text-gray-300 text-center mb-6">
    Create your account
  </p>

  <input
    type="text"
    placeholder="Enter Your Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-3 rounded-lg mb-4 outline-none bg-white"
  />

  <input
    type="email"
    name="Email"
    placeholder="Enter Your Email"
    autocomplete="off"
    value={email}
        onChange={(e) => setEmail(e.target.value)}
    className="w-full p-3 rounded-lg mb-4 outline-none bg-white"
  />

  <input
    type="tel"
    placeholder="Enter Your Phone Number"
    value={phone}
    maxLength={10}
    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
    className="w-full p-3 rounded-lg mb-4 outline-none bg-white"
  />
   <div className="relative mb-6">
    <input
      type={showpassword ? "text":"password"}
      name="Password"
      placeholder="Enter Your Password"
      autoComplete="new-password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-3 pr-12 rounded-lg outline-none bg-white"
    />
    <button
      type="button"
      onClick={()=> setShowpaswword(!showpassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showpassword ? "👁️" : "🙈"}
    </button>
  </div>
  <button
    onClick={handleData}
    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold"
  >
    Register
  </button>

  <p className="text-center text-gray-300 mt-5">
    Already have an account?
    <span
      onClick={() => navigate("/login", { replace: true })}
      className="text-yellow-500 cursor-pointer ml-2"
    >
      Login
    </span>
  </p>

</div>
</div>
  )
}

export default Register