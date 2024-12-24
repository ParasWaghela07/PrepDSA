import { useState, useEffect } from "react";
import Questionbox from "../components/Questionbox";

function Landing({allquestions,allcompanies,alltopics}) {
  const [difficulty, setDifficulty] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState(allquestions); // State for questions

  const [loading, setLoading] = useState(false); // State for loading

  useEffect(()=>{
    setQuestions(allquestions);
  },[allquestions]);

  const toggleSelection = (arr,setArray, value) => {

    
    setArray((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  function checkTopic(question, topics){
    let count=topics.length;
    for(let i=0;i<question.topics.length;i++){
      console.log(typeof question.topics[i],question.topics[i])
      if(topics.includes(question.topics[i].topic_name)){
        count--;
      }
    }

    return count===0;
  }

  function checkCompany(question, companies){
    let count=companies.length;
    for(let i=0;i<question.companies.length;i++){
      if(companies.includes(question.companies[i].company_name)){
        count--;
      }
    }

    return count===0;
  }

  function filterQuestions(difficulty, topics, companies) {
    setLoading(true);
    let filteredQuestions = allquestions;

    if (difficulty.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) => difficulty.includes(question.difficulty));
    }

    
    if (topics.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) => {
        return checkTopic(question,topics);
      });
    }

    
    if (companies.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) => {
        return checkCompany(question,companies);
      });
    }


    if(filteredQuestions.length===0){
      setQuestions([]);
    }
    else setQuestions(filteredQuestions);

    setLoading(false);
  }

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
              onChange={(e) => toggleSelection(difficulty,setDifficulty,parseInt(e.target.value))}
            >
              <option value="">Select Difficulty</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
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
              onChange={(e) => toggleSelection(topics,setTopics, e.target.value)}
            >
              {alltopics.map((topic) => (
                <option key={topic._id} value={topic.topic_name}>
                  {topic.topic_name}
                </option>
              ))}
            </select>
          </div>

          {/* Companies Typable Input */}
          <div className="relative">
            <label htmlFor="companies" className="block text-gray-700 font-medium">
              Companies
            </label>
            <select
              id="topics"
              className="block w-40 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              onChange={(e) => toggleSelection(companies,setCompanies, e.target.value)}
            >
              {allcompanies.map((company) => (
                <option key={company._id} value={company.company_name}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Button */}
          <div className="relative border-2 p-2 rounded-xl">
            <button
              onClick={() => {
                filterQuestions(difficulty, topics, companies);
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
              <strong>Difficulty:</strong> {difficulty.length > 0 ? difficulty.map((d)=>{
                if(d===1) return "Easy ";
                else if(d===2) return "Medium ";
                else return "Hard ";
              }): "None"}
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
