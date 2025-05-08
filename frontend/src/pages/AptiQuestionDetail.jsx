import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AptiQuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const toastid = toast.loading("Getting question details..");
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
      .catch(() => {
        setError("An error occurred while fetching the question.");
        setLoading(false);
      });
    toast.dismiss(toastid);
  }, [id]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);

  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };
  const handleGoBack = () => {
    navigate("/aptitude"); // This takes the user back to the AptiLanding page
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!question) return <p className="text-center text-gray-400">No question data available.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 flex items-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl font-semibold">{question.question || "No Title"}</h1>

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
              className={`block w-full text-left p-4 rounded-md mt-2 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base ${selectedAnswer
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
            <button onClick={toggleExplanation} className="text-indigo-500 hover:text-indigo-400 text-sm sm:text-base">
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </button>
          </div>
        )}

        {showExplanation && selectedAnswer && (
          <div className="mt-4 p-4 bg-gray-700 rounded-md">
            <p className="text-gray-300 text-sm sm:text-base">{question.explanation || "No Explanation"}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-between text-gray-400 text-sm sm:text-base">
          <span>
            <strong>Difficulty:</strong> {question.difficulty}
          </span>
          <span>
            <strong>Topic:</strong> {question.topic}
          </span>
        </div>
        <div className="mt-6">
          <button
            onClick={handleGoBack}
            className="w-full p-3 mt-4 bg-blue-500 hover:bg-blue-400 text-white rounded-md transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AptiQuestionDetail;
