import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import UserInfo from "../components/UserInfo";
import UserStats from "../components/UserStats";
import SolvedQuestions from "../components/SolvedQuestions";
import BookmarkedQuestions from "../components/BookmarkedQuestions";

function Profile() {
  const { isLoggedIn, setloader } = useContext(AppContext);
  const [userDetails, setUserDetails] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg space-y-8"
      >
        <h1 className="text-3xl font-bold text-teal-400">User Profile</h1>
        <UserInfo userDetails={userDetails} />
        <UserStats userDetails={userDetails} />
        <SolvedQuestions questions={userDetails.solved_question_ids} />
        <BookmarkedQuestions questions={userDetails.bookmarkedquestions} />
      </motion.div>
    </div>
  );
}

export default Profile;
