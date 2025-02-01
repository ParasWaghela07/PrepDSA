import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import UserInfo from "../components/UserInfo";
import UserStats from "../components/UserStats";
import SolvedQuestions from "../components/SolvedQuestions";
import BookmarkedQuestions from "../components/BookmarkedQuestions";
import { useNavigate,useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";


function Profile() {
  const {user}=useContext(AppContext);
  const userDetails=user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab,settab]=useState(true);
  const navigate = useNavigate();



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
        <div className="flex items-center justify-between space-x-4">

          <div>
            <UserInfo userDetails={userDetails} />
          </div>

          <div className="flex flex-col items-center justify-center gap-y-4">
          {userImg && (
            <img
              src={userImg}
              alt="User"
              className="w-[150px] h-[150px] rounded-full border-2 border-teal-400 object-cover cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          )}

          <div className="flex items-center justify-center bg-gray-600  rounded-md px-2 py-1 gap-x-1">
            <FaEdit />
            <h1 
              className="text-sm font-bold text-gray-200 w-fit rounded-md cursor-pointer"
              onClick={() => navigate('/changeProfile')}
            >
              Edit profile
            </h1>
          </div>

          </div>

        </div>
        <UserStats userDetails={userDetails} />

        <div className="flex gap-x-6 w-fit rounded-lg">
          <p className={`cursor-pointer px-2 py-1 rounded-md text-xl font-bold ${tab ? "bg-teal-500" : ""} transition duration-300`}
          onClick={()=>{settab(true)}}
          >Solved</p>
          <p className={`cursor-pointer px-2 py-1 rounded-md text-xl font-bold ${!tab ? "bg-teal-500" : ""} transition duration-300`}
          onClick={()=>{settab(false)}}
          >Bookmarked</p>
        </div>

        {tab ?  <SolvedQuestions questions={userDetails.solved_question_ids} /> : <BookmarkedQuestions questions={userDetails.bookmarkedquestions} />
        }
      </motion.div>
    </div>
  );
}

export default Profile;
