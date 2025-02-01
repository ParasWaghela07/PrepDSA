import { useContext, useEffect, useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Questionstrip({ questionid1, difficulty, title }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate=useNavigate();
    const {user,setuser,setloader}=useContext(AppContext);
    const [isChecked, setIsChecked] = useState(false);

    function checkstatus(){
        const user_solved_qsts=user.solved_question_ids;
        for(let i=0;i<user_solved_qsts?.length;i++){
            if(user_solved_qsts[i]._id===questionid1){
                setIsChecked(true);
                break;
            }
        }
    }

    function checkbookmarkstatus() {
        const user_bookmarked_qsts=user.bookmarkedquestions;
        for(let i=0;i<user_bookmarked_qsts?.length;i++){
            if(user_bookmarked_qsts[i]._id===questionid1){
                setIsBookmarked(true);
                break;
            }
        }
    }

    async function pushtobookmark() {
        try {
            const response=await fetch("http://localhost:4000/bookmark", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionid: questionid1,
                }),
                credentials: "include",
            });
            const res=await response.json();
            console.log(res);
            if(res.success) setuser(res.user);
        } catch (error) {
            console.error("Error bookmarking question:", error);
        }
    }

    async function popfrombookmark() {
        try {
            const response=await fetch("http://localhost:4000/popfrombookmark", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionid: questionid1,
                }),
                credentials: "include",
            });
            const res=await response.json();
            console.log(res);
            if(res.success) setuser(res.user);
        } catch (error) {
            console.error("Error removing bookmark:", error);
        }
    }

    function addqstnametoparams() {
        navigate(`/question/${questionid1}`);
    }
    
    useEffect(() => {
        checkstatus();
        checkbookmarkstatus();
    }, [user]);

    return (
        <div className="flex items-center gap-x-2 w-full">
                        {/* Checkbox and Bookmark */}
            <div className="flex items-center gap-4">
                {/* <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        if (!isChecked) {
                            setIsChecked(true);
                            pushtosolved(questionid1);
                        }
                    }}
                    className="w-6 h-6 cursor-pointer accent-green-500"
                /> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isBookmarked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 cursor-pointer ${
                        isBookmarked ? "text-yellow-400" : "text-gray-500"
                    } hover:text-yellow-300`}
                    onClick={() => {
                        if (!isBookmarked) {
                            setIsBookmarked(true);
                            pushtobookmark();
                        } else {
                            setIsBookmarked(false);
                            popfrombookmark();
                        }
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 3.75H6.75A2.25 2.25 0 004.5 6v15.188c0 .376.41.603.731.398l6.269-4.178a.75.75 0 01.999 0l6.269 4.178c.32.205.731-.022.731-.398V6a2.25 2.25 0 00-2.25-2.25z"
                    />
                </svg>
            </div>
        <div
            className={`h-[8vh] w-full flex justify-between overflow-x-hidden items-center py-2 px-2 rounded-lg shadow-md bg-gray-800 text-gray-300 transition-all hover:shadow-lg cursor-pointer overflow-hidden`}
        >
            <IoCheckmarkCircleOutline className={`${!isChecked && "opacity-0"} text-2xl text-green-500 mr-2`}/>

            {/* Title */}
            <h3 className="flex-grow font-medium"  onClick={addqstnametoparams}>{title}</h3>


            


            {/* Difficulty */}
            <p
                className={`text-sm font-semibold ${
                    difficulty == 3
                        ? "text-red-500"
                        : difficulty ==2
                        ? "text-yellow-500"
                        : "text-green-500"
                }`}
            >
                {difficulty==3 ? "Hard" : difficulty==2 ? "Medium" : "Easy"}
            </p>
        </div>
        </div>
    );
}

export default Questionstrip;
