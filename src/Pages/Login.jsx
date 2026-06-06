import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo Login
    if (
      email === "abc123@email.com" &&
      password === "1234"
    ) {
      navigate("/Home");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80')",
      }}
    >
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Box */}
      <div className="relative z-10 w-[380px] p-8 rounded-3xl
      bg-white/10 backdrop-blur-lg border
      border-yellow-600 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-yellow-500">
          Welcome Back
        </h1>

        <p className="text-gray-300 text-center mt-2 mb-6">
          Sign in to continue shopping
        </p>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="p-3 rounded-lg
            bg-black/40 text-white
            border border-gray-600
            outline-none"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="p-3 rounded-lg
            bg-black/40 text-white
            border border-gray-600
            outline-none"
          />

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500
            transition-all duration-300
            text-white py-3 rounded-lg
            font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-300 mt-5">
          Don't have an account?
          <span
            onClick={()=>navigate("/register")}
            className="text-yellow-500 cursor-pointer ml-2"
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;