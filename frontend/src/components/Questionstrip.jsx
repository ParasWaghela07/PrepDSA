import { useContext, useEffect, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Questionstrip({ questionid1, difficulty, title, role, sheetarray, setsheetarray, kahaseayahai }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
  const { user, setuser } = useContext(AppContext);
  const [isChecked, setIsChecked] = useState(false);

  function checkstatus() {
    setIsChecked(user?.solved_question_ids?.some(q => q._id === questionid1));
  }

  function checkbookmarkstatus() {
    setIsBookmarked(user?.bookmarkedquestions?.some(q => q._id === questionid1));
  }

  async function pushtobookmark() {
    try {
      const response = await fetch("http://localhost:4000/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionid: questionid1 }),
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) setuser(res.user);
    } catch (error) {
      console.error("Error bookmarking question:", error);
    }
  }

  async function popfrombookmark() {
    try {
      const response = await fetch("http://localhost:4000/popfrombookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionid: questionid1 }),
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) setuser(res.user);
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  }

  function addqstnametoparams() {
    navigate(`/question/${questionid1}`);
  }

  function addtosheetarray() {
    setsheetarray([...sheetarray, questionid1]);
  }

  function popfromsheetarray() {
    setsheetarray(sheetarray.filter(num => num !== questionid1));
  }

  useEffect(() => {
    if (user) {
      checkstatus();
      checkbookmarkstatus();
    }
  }, [user]);

  return (
    <div className="flex items-center gap-x-2 w-full sm:px-4">
      {/* Bookmark */}
      <div className="flex items-center">
        {kahaseayahai !== "spectopicse" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isBookmarked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 cursor-pointer ${isBookmarked ? "text-yellow-400" : "text-gray-500"} hover:text-yellow-300`}
            onClick={() => {
              role === "user"
                ? isBookmarked
                  ? popfrombookmark()
                  : pushtobookmark()
                : isBookmarked
                ? popfromsheetarray()
                : addtosheetarray();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 3.75H6.75A2.25 2.25 0 004.5 6v15.188c0 .376.41.603.731.398l6.269-4.178a.75.75 0 01.999 0l6.269 4.178c.32.205.731-.022.731-.398V6a2.25 2.25 0 00-2.25-2.25z"
            />
          </svg>
        )}
      </div>

      {/* Question Box */}
      <div
        className="h-[8vh] w-full flex justify-between items-center py-2 px-2 rounded-lg shadow-md bg-gray-800 text-gray-300 transition-all hover:shadow-lg cursor-pointer"
        onClick={addqstnametoparams}
      >
        <IoCheckmarkCircleOutline className={`${!isChecked && "opacity-0"} text-2xl text-green-500 mr-2`} />
        <h3 className="flex-grow font-medium text-xs sm:text-sm md:text-base truncate">{title.length > 20 ? title.substr(0,20) +"...":title}</h3>
        <p className={`text-xs sm:text-sm font-semibold ${difficulty === 3 ? "text-red-500" : difficulty === 2 ? "text-yellow-500" : "text-green-500"}`}>
          {difficulty === 3 ? "Hard" : difficulty === 2 ? "Medium" : "Easy"}
        </p>
      </div>
    </div>
  );
}

export default Questionstrip;
