import React, { useState, useRef, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
const UpdateProfile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  const { loader, setloader} = useContext(AppContext);
   const navigate = useNavigate();
  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropzoneClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    if (!image && !name && !username) {
     toast.error("Please provide at least one update.");
      setloader(false);
      return;
    }

    const formData = new FormData();
    if (image) formData.append("imgfile", image);
    if (name) formData.append("name", name);
    if (username) formData.append("username", username);
    setMessage("");
    // console.log(formData);
    try {
      const response = await fetch("http://localhost:4000/changeProfile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        setMessage("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/profile')
      } else {
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setloader(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-8 flex justify-center items-center">
<motion.div
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="w-full sm:w-[60%] md:w-[50%] lg:w-[30%] max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-8"
>
  <h2 className="text-3xl font-bold text-teal-400 text-center">Update Profile</h2>
  {message && (
    <p className="text-center text-lg font-medium text-teal-300">{message}</p>
  )}
  <form onSubmit={handleSubmit} className="space-y-6">
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleDropzoneClick}
      className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer"
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] rounded-full border-2 border-teal-400 object-cover"
        />
      ) : (
        <p className="text-gray-300 text-center">Drag & drop or click to select</p>
      )}
    </div>
    <input type="file" accept="image/*" onChange={handleFileInputChange} ref={fileInputRef} className="hidden" />
    <input
      type="text"
      placeholder="Enter your new name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
    />
    <input
      type="text"
      placeholder="Enter your new username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
    />
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        type="submit"
        disabled={loader}
        className="w-full sm:w-auto bg-teal-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
      >
        Update
      </motion.button>
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate('/changePassword')}
        className="w-full sm:w-auto bg-teal-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg cursor-pointer text-center"
      >
        Change Password
      </motion.div>
    </div>
  </form>
</motion.div>

    </div>
  );
};

export default UpdateProfile;
