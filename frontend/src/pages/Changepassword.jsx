import React, { useState, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const { setloader } = useContext(AppContext);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [eyeOld, setEyeOld] = useState(true);
  const [eyeNew, setEyeNew] = useState(true);
  const [eyeConfirm, setEyeConfirm] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      setMessage("Password should be between 8 and 16 characters.");
      return;
    }

    setloader(true);

    try {
      const response = await fetch("http://localhost:4000/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Password changed successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message);
        navigate("/profile");
      } else {
        setMessage(data.message || "Failed to change password.");
        toast.error(data.message || "Failed to change password.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setloader(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 px-4 sm:px-8 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 text-center">Change Password</h2>

        {message && <p className="text-center text-sm sm:text-lg font-medium text-teal-300">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Fields */}
          {[
            { label: "Old Password", value: oldPassword, setValue: setOldPassword, eye: eyeOld, setEye: setEyeOld, id: "oldPassword" },
            { label: "New Password", value: newPassword, setValue: setNewPassword, eye: eyeNew, setEye: setEyeNew, id: "newPassword" },
            { label: "Confirm New Password", value: confirmPassword, setValue: setConfirmPassword, eye: eyeConfirm, setEye: setEyeConfirm, id: "confirmPassword" }
          ].map(({ label, value, setValue, eye, setEye, id }) => (
            <div className="relative" key={id}>
              <label htmlFor={id} className="text-sm sm:text-lg font-semibold text-teal-300 block">{label}</label>
              <input
                type={eye ? "password" : "text"}
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              {eye ? (
                <IoMdEye className="absolute right-3 top-9 sm:top-10 text-gray-400 cursor-pointer" onClick={() => setEye(false)} />
              ) : (
                <IoMdEyeOff className="absolute right-3 top-9 sm:top-10 text-gray-400 cursor-pointer" onClick={() => setEye(true)} />
              )}
            </div>
          ))}

          <p className="text-teal-400 hover:text-teal-300 font-bold text-center cursor-pointer" onClick={() => { navigate('/sendmail2'); localStorage.setItem('isLogin', true); }}>
            Forget password?
          </p>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg w-full sm:w-auto"
            >
              Update Password
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePassword;
