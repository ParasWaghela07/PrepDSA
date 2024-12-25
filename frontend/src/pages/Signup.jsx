import { toast } from "react-hot-toast";
import React, { useState, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../index.css";

function Signup() {
  const navigate = useNavigate();
  const { setloader } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [eye, setEye] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password should be a minimum of 8 characters.");
    } else if (password.length > 16) {
      toast.error("Password should be less than 16 characters.");
    } else {
      setloader(true);
      try {
        const response = await fetch("http://localhost:4000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            name: name,
            email: email,
          }),
          credentials: "include",
        });
        const res = await response.json();
        if (res.success) {
          navigate("/landing", { state: { id: email } });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
        console.error(error);
      }
      setloader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-sm bg-gray-700 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-200 text-center mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={eye ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
            {eye ? (
              <IoMdEye
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
                onClick={() => setEye(false)}
              />
            ) : (
              <IoMdEyeOff
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
                onClick={() => setEye(true)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">Already have an account?</p>
          <Link to="/login" className="text-blue-400 font-medium hover:underline">
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
