import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Sendmail2 = () => {

    const {setloader}=useContext(AppContext);

    const handleSubmit = async(e) => {
        setloader(true);
        e.preventDefault();
        
        try{
            const res=await fetch("http://localhost:4000/resetpasswordtoken2",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })

            const data=await res.json();
            if(data.success){
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(e){
            console.log(e);
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
                    Forgot Password
                </h1>
                <p className="text-gray-300 text-center mb-6">
                    We will send a password reset link to your email address.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-teal-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-teal-500"
                    >
                        Send Reset Link
                    </motion.button>
                </form>

            </motion.div>
        </div>
    );
};

export default Sendmail2;
