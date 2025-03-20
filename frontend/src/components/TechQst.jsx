import React from "react";
import { useNavigate } from "react-router-dom";

const TechQst = ({ question }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex flex-col sm:flex-row justify-between cursor-pointer p-4 text-white bg-gray-800 h-fit rounded-lg"
      onClick={() => {
        navigate(`/techquestion/${question._id}`);
      }}
    >
      <p className="text-lg sm:text-xl font-semibold">
        {question.question?.length > 20 ? question.question.substr(0, 20) + "..." : question.question}
      </p>
      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
        {question?.tags?.map((tag, index) => (
          <p key={index} className="font-medium bg-gray-50/[0.2] w-fit px-2 py-1 rounded-full text-sm sm:text-base">
            {tag.tag_name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TechQst;
