import { useEffect, useState } from "react";

function Questionstrip({ questionid1, difficulty, title }) {
    console.log(questionid1);
    const [isChecked, setIsChecked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    async function pushtosolved() {
        try {
            await fetch('http://localhost:4000/solved', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionid: questionid1
                }),
                credentials: "include"
            });
        } catch (error) {
            console.error("Error marking question as solved:", error);
        }
    }

    async function checkstatus() {
        try {
            const response = await fetch('http://localhost:4000/checksolvestatus', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionid: questionid1
                }),
                credentials: "include"
            });

            const responseData = await response.json();

            if (responseData.data) {
                setIsChecked(true);
            }
            console.log(responseData.data);
        } catch (error) {
            console.error("Error fetching solve status:", error);
        }
    }

    async function checkbookmarkstatus() {
        try {
            const response = await fetch('http://localhost:4000/checkbookmarkstatus', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionid: questionid1
                }),
                credentials: "include"
            });

            const responseData = await response.json();

            if (responseData.data) {
                setIsBookmarked(true);
            }
            console.log(responseData.data);
        } catch (error) {
            console.error("Error fetching solve status:", error);
        }
    }
    async function pushtobookmark() {
        try {
            const response = await fetch('http://localhost:4000/bookmark', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionid: questionid1
                }),
                credentials: "include"
            });
        } catch (error) {
            console.error("Error fetching solve status:", error);
        }
    }
    async function popfrombookmark() {
        try {
            const response = await fetch('http://localhost:4000/popfrombookmark', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionid: questionid1
                }),
                credentials: "include"
            });
        } catch (error) {
            console.error("Error fetching solve status:", error);
        }
    }
    useEffect(() => {
        checkstatus();
        checkbookmarkstatus();
    }, []);

    return (
        <div
            className={`flex justify-between items-center p-2 ${
                isChecked ? "bg-green-200/50" : "bg-transparent"
            }`}
        >
            {/* Checkbox */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        if (!isChecked) {
                            setIsChecked(true);
                        }
                        pushtosolved(questionid1);
                    }}
                />
                {/* Bookmark Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isBookmarked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 ${
                        isBookmarked ? "text-green-600" : "text-gray-600"
                    } cursor-pointer hover:text-gray-900`}
                    onClick={() => {
                        if (!isBookmarked) {
                            setIsBookmarked(true); 
                            pushtobookmark();// Mark as bookmarked
                        }
                        else{
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

            {/* Title */}
            <h3 className="flex-grow">{title}</h3>

            {/* Difficulty */}
            <p>Difficulty: {difficulty}</p>
        </div>
    );
}

export default Questionstrip;
