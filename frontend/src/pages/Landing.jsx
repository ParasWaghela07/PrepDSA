import { useState, useEffect,useContext } from "react";
import Questionbox from "../components/Questionbox";
import { AppContext } from "../context/AppContext";

function Landing({ allquestions, allcompanies, alltopics }) {
  const [difficulty, setDifficulty] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState(allquestions);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    isLoggedIn();
    setQuestions(allquestions);
  }, [allquestions]);

  const toggleSelection = (arr, setArray, value) => {
    console.log(arr)
    setArray((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  function checkTopic(question, topics) {
    let count = topics.length;
    for (let i = 0; i < question.topics.length; i++) {
      if (topics.includes(question.topics[i].topic_name)) {
        count--;
      }
    }
    return count === 0;
  }

  function checkCompany(question, companies) {
    let count = companies.length;
    for (let i = 0; i < question.companies.length; i++) {
      if (companies.includes(question.companies[i].company_name)) {
        count--;
      }
    }
    return count === 0;
  }

  function filterQuestions(difficulty, topics, companies) {
    setLoading(true);
    let filteredQuestions = allquestions;

    if (difficulty.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) =>
        difficulty.includes(question.difficulty)
      );
    }

    if (topics.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) =>
        checkTopic(question, topics)
      );
    }

    if (companies.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) =>
        checkCompany(question, companies)
      );
    }

    setQuestions(filteredQuestions.length === 0 ? [] : filteredQuestions);
    setLoading(false);
  }

  async function logout() {
    try{
      const response=await fetch('http://localhost:4000/logout',{
        method:'GET',
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const res=await response.json();
      if(res.success){
        window.location.href='/';
      }
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full h-52 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 flex gap-x-10 items-center justify-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">Explore Questions</h1>
        <button onClick={logout} className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg font-semibold">Logout</button>

      </div>

      {/* Filters Section */}
      <div className="bg-gray-800 py-6 shadow-md">
        <div className="container mx-auto flex flex-wrap gap-6 justify-center lg:justify-between px-4">
          {/* Difficulty Dropdown */}
          <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <label htmlFor="difficulty" className="block text-sm font-medium">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
              onChange={(e) =>
                toggleSelection(difficulty, setDifficulty, parseInt(e.target.value))
              }
            >
              <option value="">Select Difficulty</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </div>

          {/* Topics Dropdown */}
          <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <label htmlFor="topics" className="block text-sm font-medium">
              Topics
            </label>
            <select
              id="topics"
              className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
              onChange={(e) => toggleSelection(topics, setTopics, e.target.value)}
            >
              {alltopics.map((topic) => (
                <option key={topic._id} value={topic.topic_name}>
                  {topic.topic_name}
                </option>
              ))}
            </select>
          </div>

          {/* Companies Dropdown */}
          <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <label htmlFor="companies" className="block text-sm font-medium">
              Companies
            </label>
            <select
              id="companies"
              className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
              onChange={(e) => toggleSelection(companies, setCompanies, e.target.value)}
            >
              {allcompanies.map((company) => (
                <option key={company._id} value={company.company_name}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Button */}
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg w-full sm:w-auto"
            onClick={() => filterQuestions(difficulty, topics, companies)}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Selected Filters */}
      <div className="bg-gray-700 py-4">
        <div className="container mx-auto text-sm px-4">
          <h3 className="text-lg font-semibold">Selected Filters:</h3>
          <div className="flex gap-6 mt-2 flex-wrap">
            <p>
              <strong>Difficulty:</strong>{" "}
              {difficulty.length > 0
                ? difficulty
                    .map((d) =>
                      d === 1 ? "Easy" : d === 2 ? "Medium" : "Hard"
                    )
                    .join(", ")
                : "None"}
            </p>
            <p>
              <strong>Topics:</strong> {topics.length > 0 ? topics.join(", ") : "None"}
            </p>
            <p>
              <strong>Companies:</strong>{" "}
              {companies.length > 0 ? companies.join(", ") : "None"}
            </p>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading questions...</p>
        ) : (
          <Questionbox
            questions={questions}
            difficulty={difficulty}
            companies={companies}
            topics={topics}
          />
        )}
      </div>
    </div>
  );
}

export default Landing;
