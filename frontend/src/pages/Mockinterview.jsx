import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { AppContext } from "../context/AppContext";

// Helper function to get stored end time
const getStoredEndTime = () => {
  const storedEndTime = localStorage.getItem('mockInterviewEndTime');
  return storedEndTime ? parseInt(storedEndTime) : null;
};

function Mockinterview() {
  const navigate = useNavigate();
  const { setloader } = useContext(AppContext);

  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [questions, setQuestions] = useState({
    dsaQuestions: [],
    aptiquestions: [],
    techquestions: [],
  });
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(0);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [maxScore, setMaxScore] = useState(0);
  const [resultsSummary, setResultsSummary] = useState([]);
  const [timerInterval, setTimerInterval] = useState(null);

  // Load saved state from local storage on component mount
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("mockInterviewState"));
    const storedEndTime = getStoredEndTime();

    if (savedState && !savedState.interviewEnded && storedEndTime) {
      const remainingSeconds = Math.max(0, Math.floor((storedEndTime - Date.now()) / 1000));
      
      setCompany(savedState.company);
      setInterviewStarted(savedState.interviewStarted);
      setTimeLeft(remainingSeconds);
      setQuestions(savedState.questions);
      setResponses(savedState.responses);
      setScore(savedState.score);
      setInterviewEnded(savedState.interviewEnded);
      calculateMaxScore(savedState.questions);

      if (remainingSeconds > 0 && !interviewEnded) {
        startTimer(remainingSeconds);
      } else {
        endInterview();
      }
    }
  }, []);

  // Save state to local storage whenever state changes
  useEffect(() => {
    if (interviewStarted && !interviewEnded) {
      const stateToSave = {
        company,
        interviewStarted,
        timeLeft,
        questions,
        responses,
        score,
        interviewEnded,
      };
      localStorage.setItem("mockInterviewState", JSON.stringify(stateToSave));
    }
  }, [company, interviewStarted, timeLeft, questions, responses, score, interviewEnded]);

  // Timer logic with persistent storage
  const startTimer = (durationSeconds) => {
    const endTime = Date.now() + durationSeconds * 1000;
    localStorage.setItem('mockInterviewEndTime', endTime.toString());

    // Clear existing interval if any
    if (timerInterval) clearInterval(timerInterval);

    const interval = setInterval(() => {
      const remainingSeconds = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remainingSeconds);

      if (remainingSeconds <= 0) {
        clearInterval(interval);
        endInterview();
      }
    }, 1000);

    setTimerInterval(interval);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    setloader(true);
    try {
      const response = await fetch("http://localhost:4000/generatemock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
      calculateMaxScore(data);
      setloader(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setloader(false);
    }
  };

  async function getallcompanies() {
    try {
      const response = await fetch("http://localhost:4000/getallcompanies");
      const data = await response.json();
      setCompanies(data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  }

  useEffect(() => {
    getallcompanies();
  }, []);

  // Calculate maximum possible score
  const calculateMaxScore = (questions) => {
    let totalMaxScore = 0;

    questions.dsaQuestions.forEach((q) => {
      totalMaxScore += q.difficulty === 1 ? 10 : q.difficulty === 2 ? 20 : 30;
    });

    questions.aptiquestions.forEach((q) => {
      totalMaxScore += q.difficulty === "Easy" ? 5 : q.difficulty === "Medium" ? 10 : 15;
    });

    questions.techquestions.forEach(() => {
      totalMaxScore += 10;
    });

    setMaxScore(totalMaxScore);
  };

  // Start the interview
  const startInterview = async () => {
    await fetchQuestions();
    startTimer(3600); // 1 hour
    setInterviewStarted(true);
  };

  // End the interview
  const endInterview = () => {
    calculateScore();
    setInterviewEnded(true);
    if (timerInterval) clearInterval(timerInterval);
    localStorage.removeItem("mockInterviewState");
    localStorage.removeItem("mockInterviewEndTime");
  };

  // Reset interview state
  const resetInterview = () => {
    setCompany("");
    setInterviewStarted(false);
    setInterviewEnded(false);
    setTimeLeft(3600);
    setQuestions({
      dsaQuestions: [],
      aptiquestions: [],
      techquestions: [],
    });
    setResponses({});
    setScore(0);
    setMaxScore(0);
    setResultsSummary([]);
    if (timerInterval) clearInterval(timerInterval);
    localStorage.removeItem("mockInterviewState");
    localStorage.removeItem("mockInterviewEndTime");
  };

  // Handle user response for each question
  const handleResponse = (questionId, status) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: status,
    }));
  };

  // Calculate the final score and generate results summary
  const calculateScore = () => {
    let totalScore = 0;
    const summary = [];

    questions.dsaQuestions.forEach((q) => {
      const marks = q.difficulty === 1 ? 10 : q.difficulty === 2 ? 20 : 30;
      if (responses[q._id] === "solved") {
        totalScore += marks;
      }
      summary.push({
        section: "DSA",
        question: q.question_title,
        status: responses[q._id] || "Not solved",
        marks: responses[q._id] === "solved" ? marks : 0,
      });
    });

    questions.aptiquestions.forEach((q) => {
      const marks = q.difficulty === "Easy" ? 5 : q.difficulty === "Medium" ? 10 : 15;
      if (responses[q._id] === "solved") {
        totalScore += marks;
      }
      summary.push({
        section: "Aptitude",
        question: q.question,
        status: responses[q._id] || "Not solved",
        marks: responses[q._id] === "solved" ? marks : 0,
      });
    });

    questions.techquestions.forEach((q) => {
      const marks = 10;
      if (responses[q._id] === "solved") {
        totalScore += marks;
      }
      summary.push({
        section: "Technical",
        question: q.question,
        status: responses[q._id] || "Not solved",
        marks: responses[q._id] === "solved" ? marks : 0,
      });
    });

    setScore(totalScore);
    setResultsSummary(summary);
  };
  
  // Render a single question with options
  const renderQuestion = (question, section) => {
    return (
      <div 
        onClick={() => {
          if (section === "dsa") {
            window.open(question.redirectLinks[0], "_blank");
          } else if (section === "tech") {
            navigate(`/techquestion/${question._id}`);
          } else {
            navigate(`/aptitude/question/${question._id}`);
          }
        }}  
        key={question._id} 
        className="mb-6 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600/[0.8] transition-colors"
      >
        <h4 className="text-lg font-semibold mb-2 text-teal-400">
          {section === "dsa" ? question.question_title : question.question}
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              responses[question._id] === "solved"
                ? "bg-green-600 text-white"
                : "bg-gray-600 text-gray-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleResponse(question._id, "solved");
            }}
          >
            Solved
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              responses[question._id] === "attempted"
                ? "bg-yellow-600 text-white"
                : "bg-gray-600 text-gray-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleResponse(question._id, "attempted");
            }}
          >
            Attempted
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              responses[question._id] === "not-solved"
                ? "bg-red-600 text-white"
                : "bg-gray-600 text-gray-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleResponse(question._id, "not-solved");
            }}
          >
            Not solved
          </button>
        </div>
      </div>
    );
  };

  // Render the results summary
  const renderResultsSummary = () => {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-teal-400">Test Summary</h2>
        <div className="space-y-4">
          {resultsSummary.map((result, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold text-gray-100">{result.question}</p>
              <p className="text-gray-400">Section: {result.section}</p>
              <p className="text-gray-400">Status: {result.status}</p>
              <p className="text-gray-400">Marks: {result.marks}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SingleSelectModal = ({ isOpen, onClose, title, options, selectedOption, setSelectedOption }) => {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    const handleSelect = (option) => {
      setSelectedOption(option);
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 overflow-y-auto z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 max-h-[80vh] overflow-y-auto"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-teal-400 mb-4">{title}</h2>
          <div className="flex flex-wrap gap-2">
            {options?.map((option) => (
              <motion.div
                key={option.company_name}
                whileHover={{ scale: 1.02 }}
                className={`p-2 text-sm sm:text-base rounded-lg cursor-pointer transition-all duration-150 ${
                  selectedOption === option.company_name ? "bg-teal-500 text-gray-900" : "bg-gray-700 text-gray-100"
                }`}
                onClick={() => handleSelect(option.company_name)}
              >
                {option.company_name}
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
              className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 w-full sm:w-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-teal-400">Mock Interview</h1>

        {!interviewStarted ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <p className="text-lg mb-6">
                {company ? (
                  <span>Selected Company: <span className="text-teal-400 font-bold">{company}</span></span>
                ) : (
                  "Please select a company to start the interview"
                )}
              </p>
              <button
                onClick={() => setIsCompaniesModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mb-4 w-full max-w-xs font-semibold"
              >
                {company ? "Change Company" : "Select Company"}
              </button>
              {company && (
                <button
                  onClick={startInterview}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 mb-4 rounded-lg w-full max-w-xs font-semibold"
                >
                  Start Interview
                </button>
              )}

              <p className="text-teal-400 font-bold text-xl mb-4">OR</p>
              <button
                onClick={startInterview}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg w-full max-w-xs font-semibold"
              >
                Random Interview
              </button>
            </div>

            {companies && 
              <SingleSelectModal
                isOpen={isCompaniesModalOpen}
                onClose={() => setIsCompaniesModalOpen(false)}
                title="Select a Company"
                options={companies}
                selectedOption={company}
                setSelectedOption={setCompany}
              />
            }
          </div>
        ) : interviewEnded ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-teal-400">Interview Ended!</h2>
                <h3 className="text-xl mb-6">
                  Your Score: <span className="font-bold text-teal-400">{score}</span> out of {maxScore}
                </h3>
              </div>
              <button
                onClick={resetInterview}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Start New Interview
              </button>
            </div>
            {renderResultsSummary()}
          </div>
        ) : (
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="text-xl font-semibold bg-gray-700 px-4 py-2 rounded-lg">
                Time Left: {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
              </div>
              <button
                onClick={endInterview}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg w-full md:w-auto"
              >
                End Interview
              </button>
            </div>
            
            <div className="space-y-8">
              {questions.dsaQuestions.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-400">DSA Questions</h2>
                  {questions.dsaQuestions.map((q) => renderQuestion(q, "dsa"))}
                </div>
              )}

              {questions.aptiquestions.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-400">Aptitude Questions</h2>
                  {questions.aptiquestions.map((q) => renderQuestion(q, "apti"))}
                </div>
              )}

              {questions.techquestions.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-400">Technical Questions</h2>
                  {questions.techquestions.map((q) => renderQuestion(q, "tech"))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mockinterview;