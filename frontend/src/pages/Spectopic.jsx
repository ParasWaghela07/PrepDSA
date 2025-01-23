import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import Questionbox from "../components/Questionbox";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Spectopic() {
  const [difficulty, setDifficulty] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [topics, setTopics] = useState([]);
  const {current_topic_array,setcurrent_topic_array}=useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useContext(AppContext);
  const [searchInput, setsearchInput] = useState("");
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
    //setQuestions(allquestions);
  }, []);

  const toggleSelection = (arr, setArray, value) => {
    setArray((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

//   function checkTopic(question, topics) {
//     for (let i = 0; i < question.topics.length; i++) {
//       if (topics.includes(question.topics[i].topic_name)) {
//         return true;
//       }
//     }
//     return false;
//   }

//   function checkCompany(question, companies) {
//     for (let i = 0; i < question.companies.length; i++) {
//       if (companies.includes(question.companies[i].company_name)) {
//         return true;
//       }
//     }
//     return false;
//   }

  function filterQuestions(difficulty, companies) {
    
    let filteredQuestions = current_topic_array;

    for(let i=0;i<difficulty.length;i++){
      difficulty[i]=difficulty[i]==="Easy"?1:difficulty[i]==="Medium"?2:3;
    }

    //console.log(difficulty,topics,companies);

    if (difficulty.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) =>
        difficulty.includes(question.difficulty)
      );
    }

    // if (topics.length > 0) {
    //   filteredQuestions = filteredQuestions.filter((question) =>
    //     checkTopic(question, topics)
    //   );
    // }

    if (companies.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) =>
        checkCompany(question, companies)
      );
    }

    console.log(filteredQuestions)

    setcurrent_topic_array(filteredQuestions.length === 0 ? [] : filteredQuestions);

    for(let i=0;i<difficulty.length;i++){
      difficulty[i]=difficulty[i]===1?"Easy":difficulty[i]===2?"Medium":"Hard";
    }
    
  }

  // const searchQuestions = () => {
  //   const filteredQuestions = current_topic_array.filter((question) =>
  //     question.question_title.toLowerCase().includes(searchInput.toLowerCase())
  //   );
  //   setcurrent_topic_array(filteredQuestions.length === 0 ? [] : filteredQuestions);
  // };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const res = await response.json();
      if (res.success) {
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
   // searchQuestions();
  }, [searchInput]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 overflow-x-hidden">
      <div className="w-full h-52 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 flex gap-x-10 items-center justify-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">Explore Questions</h1>
        <button onClick={logout} className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg font-semibold">
          Logout
        </button>
        <button onClick={() => navigate('/profile')} className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-lg font-semibold">
          Profile
        </button>
      </div>

      <div className="bg-gray-800 py-6 shadow-md">
        <div className="container mx-auto flex flex-wrap gap-6 justify-center lg:justify-between px-4">
          <div
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
            onClick={() => setIsDifficultyModalOpen(true)}
          >
            <label className="block text-sm font-medium">Difficulty</label>
            <div className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md">
              Select Difficulty
            </div>
          </div>

          {/* <div
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
            onClick={() => setIsTopicsModalOpen(true)}
          >
            <label className="block text-sm font-medium">Topics</label>
            <div className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md">
              Select Topics
            </div>
          </div> */}

          <div
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
            onClick={() => setIsCompaniesModalOpen(true)}
          >
            <label className="block text-sm font-medium">Companies</label>
            <div className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md">
              Select Companies
            </div>
          </div>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg w-full sm:w-auto"
            onClick={() => filterQuestions(difficulty, topics, companies)}
          >
            Apply Filters
          </button>
        </div>
      </div>

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
        //options={alltopics.map((topic) => topic.topic_name)}
        selectedOptions={topics}
        toggleOption={(value) => toggleSelection(topics, setTopics, value)}
      />
      <Modal
        isOpen={isCompaniesModalOpen}
        onClose={() => setIsCompaniesModalOpen(false)}
        title="Select Companies"
       // options={allcompanies.map((company) => company.company_name)}
        selectedOptions={companies}
        toggleOption={(value) => toggleSelection(companies, setCompanies, value)}
      />

      <div className="ml-10 mt-10">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
          placeholder="Search question"
          className="w-[30%] p-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none"
        />
      </div>

      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading questions...</p>
        ) : (
          <Questionbox
            questions={current_topic_array}
            difficulty={difficulty}
            companies={companies}
            topics={topics}
          />
        )}
      </div>
    </div>
  );
}

export default Spectopic;
