import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const AptiLanding = () => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const navigate = useNavigate();
  const predefinedTopics = ["Arithmetic", "Algebra", "Geometry", "Mathematics"];
  const quizDurations = [15, 25, 30];

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/aptitude/questions`);
      const data = await response.json();
      setAllQuestions(data.questions);
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuestions = () => {
    setLoading(true);
    try {
      const filteredQuestions = allQuestions.filter((question) => {
        const matchesDifficulty = difficulty.length ? difficulty.includes(question.difficulty) : true;
        const matchesTopic = topics.length ? topics.includes(question.topic) : true;
        const matchesSearch = searchQuery ? question.question.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesDifficulty && matchesTopic && matchesSearch;
      });
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Error filtering questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (arr, setArray, value) => {
    setArray((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  useEffect(() => {
    filterQuestions();
  }, [difficulty, topics, searchQuery]);

  const startQuiz = async (selectedTime) => {
    setIsQuizModalOpen(false);
    setLoading(true);
    try {
      const filteredQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
      navigate("/aptiquiz", { state: { questions: filteredQuestions, time: selectedTime } });
    } catch (error) {
      console.error("Error starting quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800  py-4 sm:py-6 shadow-md flex flex-col sm:flex-row justify-between items-center px-6 sm:px-10 gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative cursor-pointer" onClick={() => setIsDifficultyModalOpen(true)}>
            <label className="text-sm font-medium block">Difficulty</label>
            <div className="bg-gray-700 text-gray-100 p-2 rounded-md cursor-pointer text-center sm:text-left">
              Select Difficulty
            </div>
          </div>

          <div className="relative cursor-pointer" onClick={() => setIsTopicsModalOpen(true)}>
            <label className="text-sm font-medium block">Topics</label>
            <div className="bg-gray-700 text-gray-100 p-2 rounded-md cursor-pointer text-center sm:text-left">
              Select Topics
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsQuizModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto"
        >
          Take Quiz
        </button>
      </div>

      <div className="mt-6 sm:mt-10 flex justify-center">
        <input
          type="text"
          placeholder="Search question"
          className="w-full max-w-xs sm:max-w-md p-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none text-gray-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container mx-auto p-6 w-full">
        {loading ? (
          <p className="text-center text-gray-400">Loading questions...</p>
        ) : questions?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((question) => (
              <Link
                to={`/aptitude/question/${question._id}`}
                key={question._id}
                className="bg-gray-700 text-gray-100 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm sm:text-lg">{question.question}</h3>
                  <span className={`text-sm font-medium ${question.difficulty === "Easy" ? "text-green-500" : question.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"}`}>
                    {question.difficulty}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-xs sm:text-sm text-gray-400">{question.topic}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="h-full flex justify-center items-center font-bold text-xl sm:text-2xl text-center">No Questions found</p>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isDifficultyModalOpen}
        onClose={() => setIsDifficultyModalOpen(false)}
        title="Select Difficulty"
        options={["Easy", "Medium", "Hard"]}
        selectedOptions={difficulty}
        toggleOption={(value) => toggleSelection(difficulty, setDifficulty, value)}
      />

      <Modal
        isOpen={isTopicsModalOpen}
        onClose={() => setIsTopicsModalOpen(false)}
        title="Select Topics"
        options={predefinedTopics}
        selectedOptions={topics}
        toggleOption={(value) => toggleSelection(topics, setTopics, value)}
      />

      <Modal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Select Quiz Duration"
        options={quizDurations.map((time) => `${time} minutes`)}
        toggleOption={(value) => startQuiz(parseInt(value))}
      />
    </div>
  );
};

export default AptiLanding;
