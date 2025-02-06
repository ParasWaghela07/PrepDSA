import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import Questionbox from "../components/Questionbox";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Spectopic() {

  const topicid=useParams();

  const [difficulty, setDifficulty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { setloader } = useContext(AppContext);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  async function gettopicdetail() {
    const toastid=toast.loading("Fetching questions...");
    try {
      const response = await fetch("http://localhost:4000/gettopicdetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicid: topicid.topicid,
        }),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data)
      if (data.success) {
       setFetchedQuestions(data.data.question_list);
       setQuestions(data.data.question_list);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    toast.dismiss(toastid);
  }

  useEffect(() => {
    gettopicdetail();
  },[])

  

  const navigate = useNavigate();

  const toggleSelection = (arr, setArray, value) => {
    setArray((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };



  function filterQuestions(difficulty, companies) {
    
    let filteredQuestions = fetchedQuestions;

    for(let i=0;i<difficulty.length;i++){
      difficulty[i]=difficulty[i]==="Easy"?1:difficulty[i]==="Medium"?2:3;
    }

    //console.log(difficulty,topics,companies);

    if (difficulty.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) =>
        difficulty.includes(question.difficulty)
      );
    }

    console.log(filteredQuestions)

    setQuestions(filteredQuestions.length === 0 ? [] : filteredQuestions);

    for(let i=0;i<difficulty.length;i++){
      difficulty[i]=difficulty[i]===1?"Easy":difficulty[i]===2?"Medium":"Hard";
    }
    
  }

  const searchQuestions = () => {
    const filteredQuestions = fetchedQuestions.filter((question) =>
      question.question_title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setQuestions(filteredQuestions.length === 0 ? [] : filteredQuestions);
  };



  useEffect(() => {
   searchQuestions();
  }, [searchInput]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 overflow-x-hidden">
      <div className="w-full h-52 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 flex gap-x-10 items-center justify-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">Explore Questions</h1>
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
            questions={questions}
            searchInput={searchInput}
          />
        )}
      </div>
    </div>
  );
}

export default Spectopic;
