import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import Questionbox from "../components/Questionbox";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Sheetdisplay() {
  const [difficulty, setDifficulty] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [topics, setTopics] = useState([]);
  //const [questions, setQuestions] = useState(allquestions);
  const [loading, setLoading] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [isCompaniesModalOpen, setIsCompaniesModalOpen] = useState(false);
  const location=useLocation();
  const { sheetname, question } = location.state || {};
  console.log(question);
  const [allcompanies, setallcompanies] = useState([]);
  const [alltopics, setalltopics] = useState([]);
  const { loader, user, setuser } = useContext(AppContext);
  const token = JSON.parse(localStorage.getItem('token'));
  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 overflow-x-hidden">
      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading questions...</p>
        ) : (
          <Questionbox
            questions={question}
            difficulty={difficulty}
            companies={companies}
            topics={topics}
          />
        )}
      </div>
    </div>
  );
}

export default Sheetdisplay;
