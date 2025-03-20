import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Dropdown } from "../components/Dropdown";

const TechQuestion = () => {
  const { qstid } = useParams();
  const [question, setQuestion] = useState();
  const location = useLocation();

  async function getTechQuestionDetail() {
    const toastid = toast.loading("Loading...");
    try {
      const response = await fetch("http://localhost:4000/getTechQuestionDetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qstid }),
        credentials: "include",
      });

      const data = await response.json();
      setQuestion(data.data);
    } catch (error) {
      console.error("Error fetching question details:", error);
    }
    toast.dismiss(toastid);
  }

  useEffect(() => {
    getTechQuestionDetail();
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen bg-gray-800 px-4 sm:px-10 py-6 overflow-x-hidden">
      {question && (
        <div className="flex flex-col gap-y-4">
          <p className="text-white font-bold text-2xl sm:text-4xl break-words">{question.question}</p>

          {/* Tags Section */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-semibold text-md text-white">Related topics:</p>
            <div className="flex flex-wrap gap-2">
              {question?.tags?.map((tag, index) => (
                <p key={index} className="font-medium bg-gray-50/[0.2] px-2 py-1 rounded-full text-gray-100 text-sm sm:text-base">
                  {tag.tag_name}
                </p>
              ))}
            </div>
          </div>

          {/* Question Image */}
          {question?.qstImg && (
            <img src={question.qstImg} className="w-[80%] sm:w-[50%] md:w-[30%] rounded-lg mx-auto" alt="Question" />
          )}

          {/* Answers Section */}
          <div className="flex flex-col gap-y-3 mt-6">
            {question?.answer?.map((ans, index) => (
              <Dropdown key={index} title={`Answer ${index + 1}`}>
                {ans}
              </Dropdown>
            ))}
          </div>

          <p className="font-semibold text-lg sm:text-xl text-gray-200 text-center mt-4">
            Did you get it on your own?
          </p>
        </div>
      )}
    </div>
  );
};

export default TechQuestion;
