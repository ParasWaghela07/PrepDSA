import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";
import { toast } from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AppContext } from "../context/AppContext";

function Login() {
  const navigate = useNavigate();
  const { setloader } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);

  const submit = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
        navigate("/landing", { state: { id: email } });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
    setloader(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-sm bg-gray-700 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-200 text-center mb-4">Login</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type={eye ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
          <div className="mb-4 text-left">
            <Link to="/sendmail" className="text-blue-400 font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">Don't have an account?</p>
          <Link to="/signup" className="text-blue-400 font-medium hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
