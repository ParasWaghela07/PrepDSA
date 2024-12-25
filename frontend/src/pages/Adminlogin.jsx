import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AppContext } from "../context/AppContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { setloader } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);

  const submit = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      const response = await fetch("http://localhost:4000/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password1,
          password2,
        }),
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
        navigate("/adminpanel", { state: { id: email } });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
    setloader(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">
          Admin Login
        </h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password1" className="block text-sm font-medium mb-1">
              Password-1
            </label>
            <input
              id="password1"
              type={eye1 ? "password" : "text"}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="Password-1"
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {eye1 ? (
              <IoMdEye
                className="text-teal-400 text-xl absolute right-3 bottom-3 cursor-pointer"
                onClick={() => setEye1(false)}
              />
            ) : (
              <IoMdEyeOff
                className="text-teal-400 text-xl absolute right-3 bottom-3 cursor-pointer"
                onClick={() => setEye1(true)}
              />
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password2" className="block text-sm font-medium mb-1">
              Password-2
            </label>
            <input
              id="password2"
              type={eye2 ? "password" : "text"}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Password-2"
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {eye2 ? (
              <IoMdEye
                className="text-teal-400 text-xl absolute right-3 bottom-3 cursor-pointer"
                onClick={() => setEye2(false)}
              />
            ) : (
              <IoMdEyeOff
                className="text-teal-400 text-xl absolute right-3 bottom-3 cursor-pointer"
                onClick={() => setEye2(true)}
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-teal-400 text-gray-900 font-semibold rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
