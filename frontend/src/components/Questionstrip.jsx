import { useEffect, useState } from "react";

function Questionstrip({ questionid1, difficulty, title }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    async function pushtosolved() {
        try {
            await fetch("http://localhost:4000/solved", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionid: questionid1,
                    difficulty: difficulty,
                }),
                credentials: "include",
            });
        } catch (error) {
            console.error("Error marking question as solved:", error);
        }
    }

    async function checkstatus() {
        try {
            const response = await fetch("http://localhost:4000/checksolvestatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionid: questionid1,
                }),
                credentials: "include",
            });

            const responseData = await response.json();

            if (responseData.data) {
                setIsChecked(true);
            }
        } catch (error) {
            console.error("Error fetching solve status:", error);
        }
    }

    async function checkbookmarkstatus() {
        try {
            const response = await fetch("http://localhost:4000/checkbookmarkstatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionid: questionid1,
                }),
                credentials: "include",
            });

            const responseData = await response.json();

            if (responseData.data) {
                setIsBookmarked(true);
            }
        } catch (error) {
            console.error("Error fetching bookmark status:", error);
        }
    }

    async function pushtobookmark() {
        try {
            await fetch("http://localhost:4000/bookmark", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionid: questionid1,
                }),
                credentials: "include",
            });
        } catch (error) {
            console.error("Error bookmarking question:", error);
        }
    }

    async function popfrombookmark() {
        try {
            await fetch("http://localhost:4000/popfrombookmark", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionid: questionid1,
                }),
                credentials: "include",
            });
        } catch (error) {
            console.error("Error removing bookmark:", error);
        }
    }

    function addqstnametoparams() {
        window.location.href = `/question/${questionid1}`;
    }

    useEffect(() => {
        checkstatus();
        checkbookmarkstatus();
    }, []);

    return (
        <div
            className={`flex justify-between overflow-x-hidden items-center p-4 rounded-lg shadow-md transition-all ${
                isChecked ? "bg-green-900/50 text-white" : "bg-gray-800 text-gray-300"
            } hover:shadow-lg cursor-pointer`} onClick={addqstnametoparams}
        >
            {/* Checkbox and Bookmark */}
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                        if (!isChecked) {
                            setIsChecked(true);
                            pushtosolved(questionid1);
                        }
                    }}
                    className="w-6 h-6 cursor-pointer accent-green-500"
                />
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

            {/* Title */}
            <h3 className="flex-grow font-medium">{title}</h3>

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
    );
}

export default Questionstrip;
