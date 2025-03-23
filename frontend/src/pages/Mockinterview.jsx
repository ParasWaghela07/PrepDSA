import React, { useState, useEffect } from "react";

function Mockinterview() {
  const [company, setCompany] = useState("");
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
  const [maxScore, setMaxScore] = useState(0); // Maximum possible score
  const [resultsSummary, setResultsSummary] = useState([]); // Detailed summary of results

  // Load saved state from local storage on component mount
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("mockInterviewState"));
    if (savedState && !savedState.interviewEnded) {
      setCompany(savedState.company);
      setInterviewStarted(savedState.interviewStarted);
      setTimeLeft(savedState.timeLeft);
      setQuestions(savedState.questions);
      setResponses(savedState.responses);
      setScore(savedState.score);
      setInterviewEnded(savedState.interviewEnded);
      calculateMaxScore(savedState.questions); // Calculate max score for saved state
    }
  }, []);

  // Save state to local storage whenever state changes (only if interview is ongoing)
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

  // Fetch questions from the backend using fetch
  const fetchQuestions = async () => {
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
      calculateMaxScore(data); // Calculate maximum possible score after fetching questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Calculate maximum possible score
  const calculateMaxScore = (questions) => {
    let totalMaxScore = 0;

    // DSA: Easy (10), Medium (20), Hard (30)
    questions.dsaQuestions.forEach((q) => {
      totalMaxScore += q.difficulty === 1 ? 10 : q.difficulty === 2 ? 20 : 30;
    });

    // Aptitude: Easy (5), Medium (10), Hard (15)
    questions.aptiquestions.forEach((q) => {
      totalMaxScore += q.difficulty === "Easy" ? 5 : q.difficulty === "Medium" ? 10 : 15;
    });

    // Technical: Each question (10)
    questions.techquestions.forEach(() => {
      totalMaxScore += 10;
    });

    setMaxScore(totalMaxScore); // Update maxScore state
  };

  // Start the interview
  const startInterview = () => {
    if (!company) {
      alert("Please enter a company name!");
      return;
    }
    fetchQuestions();
    setInterviewStarted(true);
  };

  // End the interview
  const endInterview = () => {
    calculateScore();
    setInterviewEnded(true);
    localStorage.removeItem("mockInterviewState"); // Clear saved state
  };

  // Timer logic
  useEffect(() => {
    if (interviewStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endInterview();
    }
  }, [interviewStarted, timeLeft]);

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

    // Scoring scheme:
    // DSA: Easy (10), Medium (20), Hard (30)
    // Aptitude: Easy (5), Medium (10), Hard (15)
    // Technical: Each question (10)

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
      <div key={question._id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h4 className="text-lg font-semibold mb-2">
          {section === "dsa" ? question.question_title : question.question}
        </h4>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              responses[question._id] === "solved"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleResponse(question._id, "solved")}
          >
            Solved
          </button>
          <button
            className={`px-4 py-2 rounded ${
              responses[question._id] === "attempted"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleResponse(question._id, "attempted")}
          >
            Attempted but not solved
          </button>
          <button
            className={`px-4 py-2 rounded ${
              responses[question._id] === "not-solved"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleResponse(question._id, "not-solved")}
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
        <h2 className="text-2xl font-bold mb-4">Test Summary</h2>
        <div className="space-y-4">
          {resultsSummary.map((result, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-semibold">{result.question}</p>
              <p>Section: {result.section}</p>
              <p>Status: {result.status}</p>
              <p>Marks: {result.marks}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Mock Interview</h1>

        {!interviewStarted ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <input
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={startInterview}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Interview
            </button>
          </div>
        ) : interviewEnded ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Interview Ended!</h2>
            <h3 className="text-xl">
              Your Score: <span className="font-bold">{score}</span> out of {maxScore}
            </h3>
            {renderResultsSummary()}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div className="text-xl font-semibold">
                Time Left: {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
              </div>
              <button
                onClick={endInterview}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                End Interview
              </button>
            </div>
            {/* Render questions only if the interview is ongoing */}
            {!interviewEnded && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">DSA Questions</h2>
                  {questions.dsaQuestions.map((q) => renderQuestion(q, "dsa"))}
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Aptitude Questions</h2>
                  {questions.aptiquestions.map((q) => renderQuestion(q, "apti"))}
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Technical Questions</h2>
                  {questions.techquestions.map((q) => renderQuestion(q, "tech"))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Mockinterview;