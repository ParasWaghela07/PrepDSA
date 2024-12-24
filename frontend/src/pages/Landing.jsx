import { useState, useEffect } from "react";
import Questionbox from "../components/Questionbox";

function Landing() {
  const [difficulty, setDifficulty] = useState("");
  const [companies, setCompanies] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]); // State for questions
  const [loading, setLoading] = useState(true); // State for loading

  const toggleSelection = (array, setArray, value) => {
    setArray((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    // Fetch questions when the component mounts
    const getQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/getallquestions");
        const data = await response.json();
        setQuestions(data.data); // Assuming the questions are in `data.data`
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden ">
      <div className="w-full h-52 bg-slate-600"></div>
      <div className="bg-gray-100">
        <div className="w-full bg-white shadow-md p-4 flex items-center justify-around">
          {/* Difficulty Dropdown */}
          <div className="relative">
            <label htmlFor="difficulty" className="block text-gray-700 font-medium">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="block w-40 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Topics Dropdown */}
          <div className="relative">
            <label htmlFor="topics" className="block text-gray-700 font-medium">
              Topics
            </label>
            <select
              id="topics"
              className="block w-40 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              onChange={(e) => toggleSelection(topics, setTopics, e.target.value)}
            >
              <option value="">Select Topic</option>
              <option value="array">Array</option>
              <option value="string">String</option>
              <option value="linked-list">Linked List</option>
              <option value="binary-tree">Binary Tree</option>
              <option value="graph">Graph</option>
              <option value="dynamic-programming">Dynamic Programming</option>
              <option value="sorting">Sorting</option>
              <option value="searching">Searching</option>
              <option value="math">Math</option>
              <option value="recursion">Recursion</option>
            </select>
          </div>

          {/* Companies Typable Input */}
          <div className="relative">
            <label htmlFor="companies" className="block text-gray-700 font-medium">
              Companies
            </label>
            <input
              id="companies"
              type="text"
              placeholder="Type company name"
              className="block w-60 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  toggleSelection(companies, setCompanies, e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />
          </div>

          {/* Filter Button */}
          <div className="relative border-2 p-2 rounded-xl">
            <button
              onClick={() => {
                console.log("Difficulty:", difficulty);
                console.log("Topics:", topics);
                console.log("Companies:", companies);
              }}
            >
              Filter
            </button>
          </div>
        </div>

        <div className="p-4 mt-4 bg-white shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Selected Filters:</h3>
          <div className="mt-2">
            <p className="text-gray-600">
              <strong>Difficulty:</strong> {difficulty || "None"}
            </p>
            <p className="text-gray-600">
              <strong>Topics:</strong> {topics.length > 0 ? topics.join(", ") : "None"}
            </p>
            <p className="text-gray-600">
              <strong>Companies:</strong> {companies.length > 0 ? companies.join(", ") : "None"}
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* Loading State */}
        {loading ? (
          <p>Loading questions...</p>
        ) : (
          <Questionbox questions={questions} difficulty={difficulty} companies={companies} topics={topics} />
        )}
      </div>
    </div>
  );
}

export default Landing;
