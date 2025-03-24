import React from "react";
import { useNavigate } from "react-router-dom";

const TechQst = ({ question }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex flex-col justify-between cursor-pointer p-4 text-white bg-gray-800 rounded-lg min-h-[120px]"
      onClick={() => navigate(`/techquestion/${question._id}`)}
    >
      <p className="text-lg font-semibold">
        {question.question?.length > 40 ? question.question.substr(0, 40) + "..." : question.question}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {question?.tags?.map((tag, index) => (
          <p key={index} className="bg-gray-50/[0.2] px-3 py-1 rounded-full text-sm">
            {tag.tag_name}
          </p>
        ))}
      </div>
    </div>
  );
};


export default TechQst;
