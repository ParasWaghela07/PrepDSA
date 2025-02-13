import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast'

const AptiQuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        const toastid=toast.loading("Getting question details..")
        fetch(`http://localhost:4000/api/aptitude/question/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data from API");
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.question) {
                    setQuestion(data.question);
                    setLoading(false);
                } else {
                    setError("Question not found.");
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError("An error occurred while fetching the question.");
                setLoading(false);
            });
            toast.dismiss(toastid);
    }, [id]);

    const handleAnswerClick = (option) => {
        setSelectedAnswer(option);
        if (option === question.correctAnswer) {
            setFeedback("✅ Correct answer!");
        } else {
            setFeedback("❌ Wrong answer! Try again.");
        }
    };

    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    };

    if (loading) return <p className="text-center text-gray-400">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!question) return <p className="text-center text-gray-400">No question data available.</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold">{question.question || "No Title"}</h1>

                {feedback && (
                    <div className="mt-4 p-2 rounded-md text-center text-white">
                        <span className={selectedAnswer === question.correctAnswer ? "bg-green-600" : "bg-red-600"}>{feedback}</span>
                    </div>
                )}

                <div className="mt-4 space-y-2">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(option)}
                            className={`block w-full text-left p-4 rounded-md mt-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${selectedAnswer
                                ? option === question.correctAnswer
                                    ? "bg-green-500"
                                    : option === selectedAnswer
                                        ? "bg-red-500"
                                        : "bg-gray-600"
                                : "bg-gray-700 hover:bg-gray-600"
                                }`}
                            disabled={selectedAnswer}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {selectedAnswer && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={toggleExplanation}
                            className="text-indigo-500 hover:text-indigo-400"
                        >
                            {showExplanation ? "Hide Explanation" : "Show Explanation"}
                        </button>
                    </div>
                )}

                {showExplanation && selectedAnswer && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-md">
                        <p className="text-gray-300">{question.explanation || "No Explanation"}</p>
                    </div>
                )}

                <div className="mt-6 flex justify-between text-gray-400">
                    <span className="text-sm">
                        <strong>Difficulty:</strong> {question.difficulty}
                    </span>
                    <span className="text-sm">
                        <strong>Topic:</strong> {question.topic}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AptiQuestionDetail;
