import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import UserInfo from "../components/UserInfo";
import UserStats from "../components/UserStats";
import SolvedQuestions from "../components/SolvedQuestions";
import BookmarkedQuestions from "../components/BookmarkedQuestions";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { isLoggedIn, setloader } = useContext(AppContext);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  async function getUserDetail() {
    setloader(true);
    try {
      const response = await fetch('http://localhost:4000/getuserdetail', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const res = await response.json();
      console.log(res);
      setUserDetails(res.data);
    } catch (e) {
      console.log(e);
    }
    setloader(false);
  }

  useEffect(() => {
    isLoggedIn();
    getUserDetail();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const { userImg } = userDetails;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-8">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded w-[20%] h-[40%]">
            <img src={userImg} alt="User" className="object-cover w-full h-full" />
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="mt-4 px-4 py-2 bg-teal-400 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-teal-400">User Profile</h1>
          <div className="flex flex-col items-end">
            <h1 
              className="text-2xl font-bold text-teal-400 w-fit py-1 px-2 rounded-md cursor-pointer hover:text-teal-300"
              onClick={() => navigate('/changeProfile')}
            >
              Edit profile
            </h1>
            <h1 
              className="text-2xl font-bold text-teal-400 hover:text-teal-300 w-fit py-1 px-2 rounded-md cursor-pointer"
              onClick={() => navigate('/changepassword')}
            >
              Change password
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {userImg && (
            <img
              src={userImg}
              alt="User"
              className="w-[150px] h-[150px] rounded-full border-2 border-teal-400 object-cover cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          )}
          <div>
            <UserInfo userDetails={userDetails} />
          </div>
        </div>
        <UserStats userDetails={userDetails} />
        <SolvedQuestions questions={userDetails.solved_question_ids} />
        <BookmarkedQuestions questions={userDetails.bookmarkedquestions} />
      </motion.div>
    </div>
  );
}

export default Profile;
