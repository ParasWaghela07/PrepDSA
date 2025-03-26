import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AptiQuiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, time } = location.state || { questions: [], time: 15 };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(time * 60);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            finishQuiz();
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const finishQuiz = () => {
        if (Object.keys(selectedAnswers).length < questions.length) {
            alert("Please answer all questions before finishing the quiz.");
            return;
        }

        let finalScore = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question._id] === question.correctAnswer) {
                finalScore++;
            }
        });
        setScore(finalScore);
        setQuizCompleted(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6">
            {!quizCompleted ? (
                <>
                    <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg min-h-[300px] flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between">
                                <h2 className="text-lg font-semibold">
                                    Question {currentQuestionIndex + 1} of {questions.length}
                                </h2>
                                <p className="text-red-500 font-bold">
                                    Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                                </p>
                            </div>

                            <h3 className="text-xl font-bold mt-4">{questions[currentQuestionIndex].question}</h3>

                            <div className="mt-4">
                                {questions[currentQuestionIndex].options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`w-full text-left p-3 rounded-lg border ${selectedAnswers[questions[currentQuestionIndex]._id] === option
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-700 text-gray-100"
                                            } hover:bg-blue-600 transition-all my-2`}
                                        onClick={() => handleAnswerSelect(questions[currentQuestionIndex]._id, option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-gray-500 px-4 py-2 rounded-lg disabled:opacity-50"
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                            >
                                Previous
                            </button>

                            {currentQuestionIndex === questions.length - 1 ? (
                                <button className="bg-green-500 px-4 py-2 rounded-lg" onClick={finishQuiz}>
                                    Finish Quiz
                                </button>
                            ) : (
                                <button className="bg-green-500 px-4 py-2 rounded-lg" onClick={nextQuestion}>
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-3xl font-bold text-white">Quiz Completed!</h2>
                    <p className="text-xl mt-4">
                        Your Score: <span className="text-green-400">{score} / {questions.length}</span>
                    </p>

                    <button className="mt-6 bg-yellow-500 px-4 py-2 rounded-lg" onClick={() => setReviewMode(true)}>
                        Review Answers
                    </button>

                    <button className="mt-6 ml-4 bg-blue-500 px-4 py-2 rounded-lg" onClick={() => navigate("/aptitude")}>
                        Back to Home
                    </button>

                    {reviewMode && (
                        <div className="mt-6 text-left w-full">
                            <h3 className="text-2xl font-semibold text-gray-300">Review Your Answers:</h3>
                            <div className="mt-4 space-y-4">
                                {questions.map((question, index) => (
                                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                        <h4 className="font-bold text-lg">{index + 1}. {question.question}</h4>

                                        {question.options.map((option, i) => (
                                            <p
                                                key={i}
                                                className={`p-2 rounded ${selectedAnswers[question._id] === option
                                                    ? option === question.correctAnswer
                                                        ? "bg-green-500 text-white"
                                                        : "bg-red-500 text-white"
                                                    : "bg-gray-600"
                                                    }`}
                                            >
                                                {option}
                                            </p>
                                        ))}

                                        <p className="text-yellow-400 mt-2">
                                            Correct Answer: <span className="font-bold">{question.correctAnswer}</span>
                                        </p>
                                        <p className="text-gray-300 mt-1">
                                            Explanation: {question.explanation}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AptiQuiz;