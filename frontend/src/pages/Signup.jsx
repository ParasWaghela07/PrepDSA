import { toast } from "react-hot-toast";
import React, { useState, useContext, useEffect } from "react";
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, name, email }),
          credentials: "include",
        });
        const res = await response.json();
        if (res.success) {
          navigate("/login", { state: { id: email } });
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      }
      setloader(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = async () => {
      setloader(true);
      try {
        const response = await fetch("http://localhost:4000/isloggedin", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const res = await response.json();
        if (res.success) {
          navigate("/landing");
        }
      } catch (e) {
        console.log(e);
      }
      setloader(false);
    };
    isLoggedIn();
  }, [navigate, setloader]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 px-4">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type={eye ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
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
            className="w-full py-3 bg-teal-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-teal-500 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-300">Already have an account?</p>
          <Link to="/login" className="text-teal-400 font-medium hover:underline">
            Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
