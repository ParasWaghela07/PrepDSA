import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Questionbox from "../components/Questionbox";
import Sheetbox from "../components/Sheetbox";

function Landing({ allquestions, allcompanies, alltopics }) {
  const [difficulty, setDifficulty] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState(allquestions);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState(false);

  useEffect(() => {
    setQuestions(allquestions);
  }, [allquestions]);

  const toggleSelection = (arr, setArray, value) => {
    setArray((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const checkTopic = (question, topics) => {
    return question.topics.some((topic) => topics.includes(topic.topic_name));
  };

  const checkCompany = (question, companies) => {
    return question.companies.some((company) => companies.includes(company.company_name));
  };

  const filterQuestions = (flag = false) => {
    let filteredQuestions = allquestions;

    const difficultyMap = { Easy: 1, Medium: 2, Hard: 3 };
    const mappedDifficulty = difficulty.map((diff) => difficultyMap[diff]);

    if (mappedDifficulty.length) {
      filteredQuestions = filteredQuestions.filter((question) =>
        mappedDifficulty.includes(question.difficulty)
      );
    }

    if (topics.length) {
      filteredQuestions = filteredQuestions.filter((question) => checkTopic(question, topics));
    }

    if (companies.length) {
      filteredQuestions = filteredQuestions.filter((question) => checkCompany(question, companies));
    }

    setQuestions(filteredQuestions.length ? filteredQuestions : []);

    if (flag) searchQuestions(filteredQuestions);
  };

  const searchQuestions = (qsts) => {
    const filteredQuestions = qsts.filter((question) =>
      question.question_title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setQuestions(filteredQuestions.length ? filteredQuestions : []);
  };

  useEffect(() => {
    filterQuestions(true);
  }, [searchInput]);

  useEffect(() => {
    filterQuestions();
  }, [difficulty, companies, topics]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 px-4 sm:px-0">
      <div className="bg-gray-800 py-4 sm:py-6 shadow-md">
        <div className="container mx-auto flex flex-wrap gap-6 justify-center lg:justify-between px-4">
          {[
            { label: "Difficulty", onClick: () => setIsDifficultyModalOpen(true) },
            { label: "Topics", onClick: () => setIsTopicsModalOpen(true) },
            { label: "Companies", onClick: () => setIsCompaniesModalOpen(true) },
          ].map((filter, index) => (
            <div
              key={index}
              className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
              onClick={filter.onClick}
            >
              <label className="block text-sm font-medium">{filter.label}</label>
              <div className="block w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md">
                Select {filter.label}
              </div>
            </div>
          ))}
        </div>
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

      {/* Search Bar & Sheetbox */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 pt-5 gap-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search question"
          className="w-full sm:w-[30%] p-2 bg-gray-700 rounded-lg focus:outline-none"
          autoFocus
        />
        <Sheetbox />
      </div>

      {/* Question Box */}
      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading questions...</p>
        ) : (
          <Questionbox questions={questions} difficulty={difficulty} companies={companies} topics={topics} role={"user"} />
        )}
      </div>
    </div>
  );
}

export default Landing;
