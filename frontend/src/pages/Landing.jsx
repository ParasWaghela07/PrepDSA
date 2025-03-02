import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import Questionbox from "../components/Questionbox";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";


function Landing({ allquestions, allcompanies, alltopics }) {
  const [difficulty, setDifficulty] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState(allquestions);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState(false);


  useEffect(() => {
    setQuestions(allquestions);
  },[allquestions]);

  const toggleSelection = (arr, setArray, value) => {
    setArray((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  function checkTopic(question, topics) {
    for (let i = 0; i < question.topics.length; i++) {
      if (topics.includes(question.topics[i].topic_name)) {
        return true;
      }
    }
    return false;
  }

  function checkCompany(question, companies) {
    for (let i = 0; i < question.companies.length; i++) {
      if (companies.includes(question.companies[i].company_name)) {
        return true;
      }
    }
    return false;
  }

  function filterQuestions(flag=false) {
    
    let filteredQuestions = allquestions;

    for(let i=0;i<difficulty?.length;i++){
      difficulty[i]=difficulty[i]==="Easy"?1:difficulty[i]==="Medium"?2:3;
    }

    // console.log(difficulty,topics,companies);

    if (difficulty?.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) =>
        difficulty.includes(question.difficulty)
      );
    }

    if (topics?.length > 0) {
      filteredQuestions = filteredQuestions?.filter((question) =>
        checkTopic(question, topics)
      );
    }

    if (companies?.length > 0) {
      filteredQuestions = filteredQuestions?.filter((question) =>
        checkCompany(question, companies)
      );
    }

    // console.log(filteredQuestions)

    setQuestions(filteredQuestions?.length === 0 ? [] : filteredQuestions);

    for(let i=0;i<difficulty?.length;i++){
      difficulty[i]=difficulty[i]===1?"Easy":difficulty[i]===2?"Medium":"Hard";
    }

    if(flag===true) searchQuestions(filteredQuestions);
    
  }

  const searchQuestions = (qsts) => {
    const filteredQuestions = qsts.filter((question) =>
      question.question_title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setQuestions(filteredQuestions.length === 0 ? [] : filteredQuestions);
  };

  useEffect(() => {
    filterQuestions(true);
  }, [searchInput]);

  useEffect(()=>{
    filterQuestions();
  },[difficulty,companies,topics]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 overflow-x-hidden">

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

          <div
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
            onClick={() => setIsTopicsModalOpen(true)}
          >
            <label className="block text-sm font-medium">Topics</label>
            <div className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md">
              Select Topics
            </div>
          </div>

          <div
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
            onClick={() => setIsCompaniesModalOpen(true)}
          >
            <label className="block text-sm font-medium">Companies</label>
            <div className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md">
              Select Companies
            </div>
          </div>

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
        options={alltopics.map((topic) => topic.topic_name)}
        selectedOptions={topics}
        toggleOption={(value) => toggleSelection(topics, setTopics, value)}
      />
      <Modal
        isOpen={isCompaniesModalOpen}
        onClose={() => setIsCompaniesModalOpen(false)}
        title="Select Companies"
        options={allcompanies.map((company) => company.company_name)}
        selectedOptions={companies}
        toggleOption={(value) => toggleSelection(companies, setCompanies, value)}
      />

      <div className="ml-10 mt-10">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
          placeholder="Search question"
          className="w-[30%] p-2 bg-gray-700  rounded-lg focus:outline-none" autoFocus
        />
      </div>

      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading questions...</p>
        ) : (
          <Questionbox
            questions={questions}
            difficulty={difficulty}
            companies={companies}
            topics={topics}
            role={"user"}
          />
        )}
      </div>
    </div>
  );
}

export default Landing;
