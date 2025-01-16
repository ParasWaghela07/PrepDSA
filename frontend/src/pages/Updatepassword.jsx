import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setloader } = useContext(AppContext);
    const navigate = useNavigate();
    const token = useParams();

    const handleSubmit = async (e) => {
        setloader(true);
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            setloader(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/resetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: newPassword,
                    token,
                }),
                credentials: "include",
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                if (localStorage.getItem('isLogin') === 'true') {
                    localStorage.removeItem('isLogin');
                    navigate("/profile");
                } else {
                    navigate("/login");
                }
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error("An error occurred.");
        }
        setloader(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h1 className="text-3xl font-bold text-teal-400 text-center mb-6">
                    Update Password
                </h1>
                <p className="text-gray-300 text-center mb-6">
                    Enter your new password and confirm it.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-300"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                required
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                            />
                            {showNewPassword ? (
                                <IoMdEyeOff
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                    onClick={() => setShowNewPassword(false)}
                                />
                            ) : (
                                <IoMdEye
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                    onClick={() => setShowNewPassword(true)}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                            />
                            {showConfirmPassword ? (
                                <IoMdEyeOff
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(false)}
                                />
                            ) : (
                                <IoMdEye
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                    onClick={() => setShowConfirmPassword(true)}
                                />
                            )}
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-teal-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-teal-500"
                    >
                        Update Password
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default UpdatePassword;
