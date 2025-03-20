import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import UserInfo from "../components/UserInfo";
import UserStats from "../components/UserStats";
import SolvedQuestions from "../components/SolvedQuestions";
import BookmarkedQuestions from "../components/BookmarkedQuestions";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function Profile() {
  const { user } = useContext(AppContext);
  const userDetails = user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const { userImg } = userDetails;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 px-4 sm:px-8 py-8">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-[80%] sm:w-[50%] md:w-[30%] lg:w-[20%] p-4">
            <img src={userImg} alt="User" className="object-cover w-full h-full rounded-lg" />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-teal-400 text-white rounded w-full"
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
        className="max-w-4xl sm:max-w-6xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg space-y-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <UserInfo userDetails={userDetails} />

          <div className="flex flex-col items-center justify-center gap-y-4 mt-6 sm:mt-0">
            {userImg && (
              <img
                src={userImg}
                alt="User"
                className="w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] rounded-full border-2 border-teal-400 object-cover cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            )}

            <button
              className="flex items-center justify-center bg-gray-600 rounded-md px-2 py-1 gap-x-2 cursor-pointer text-sm sm:text-base font-bold text-gray-200"
              onClick={() => navigate("/changeProfile")}
            >
              <FaEdit />
              Edit profile
            </button>
          </div>
        </div>

        <div className="h-[1px] bg-gray-50/[0.2]"></div>

        <p className="text-2xl sm:text-3xl text-center font-semibold">DSA Progress Overview</p>
        <UserStats userDetails={userDetails} />

        <div className="flex gap-x-4 sm:gap-x-6 w-fit rounded-lg">
          {["Solved", "Bookmarked"].map((text, index) => (
            <p
              key={index}
              className={`cursor-pointer px-3 sm:px-4 py-1 rounded-md text-lg sm:text-xl font-bold transition duration-300 ${
                tab === index + 1 ? "bg-teal-500" : ""
              }`}
              onClick={() => setTab(index + 1)}
            >
              {text}
            </p>
          ))}
        </div>

        <div>
          {tab === 1 && <SolvedQuestions questions={userDetails.solved_question_ids} />}
          {tab === 2 && <BookmarkedQuestions questions={userDetails.bookmarkedquestions} />}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
