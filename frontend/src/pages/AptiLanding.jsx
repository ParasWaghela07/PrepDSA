import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const AptiLanding = () => {
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
    const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);

    const predefinedTopics = [
        "Arithmetic", "Algebra", "Geometry", "Mathematics"
    ];

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    const fetchAllQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/api/aptitude/questions`);
            const data = await response.json();
            setAllQuestions(data.questions);
            setQuestions(data.questions);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterQuestions = () => {
        setLoading(true);
        try {
            const filteredQuestions = allQuestions.filter((question) => {
                const matchesDifficulty = difficulty.length ? difficulty.includes(question.difficulty) : true;
                const matchesTopic = topics.length ? topics.includes(question.topic) : true;
                const matchesSearch = searchQuery ? question.question.toLowerCase().includes(searchQuery.toLowerCase()) : true;
                return matchesDifficulty && matchesTopic && matchesSearch;
            });
            setQuestions(filteredQuestions);
        } catch (error) {
            console.error("Error filtering questions:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelection = (arr, setArray, value) => {
        setArray((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "text-green-500";
            case "Medium":
                return "text-yellow-500";
            case "Hard":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    useEffect(()=>{
        filterQuestions();
    },[difficulty,topics,searchQuery])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="bg-gray-800 py-6 shadow-md">
                <div className="container mx-auto flex gap-6 justify-center lg:justify-around px-4">
                    <div
                        className="relative cursor-pointer"
                        onClick={() => setIsDifficultyModalOpen(true)}
                    >
                        <label className="text-sm font-medium">Difficulty</label>
                        <div className="bg-gray-700 text-gray-100 p-2 rounded-md cursor-pointer">
                            Select Difficulty
                        </div>
                    </div>

                    <div
                        className="relative cursor-pointer"
                        onClick={() => setIsTopicsModalOpen(true)}
                    >
                        <label className="text-sm font-medium">Topics</label>
                        <div className="bg-gray-700 text-gray-100 p-2 rounded-md cursor-pointer">
                            Select Topics
                        </div>
                    </div>
                </div>
            </div>

            <div className="ml-10 mt-10">
                <input
                    type="text"
                    placeholder="Search question"
                    className="w-[30%] p-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none text-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="container mx-auto p-6 w-full h-full">
                {loading ? (
                    <p className="text-center text-gray-400">Loading questions...</p>
                ) : (
                    questions?.length>0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {questions.map((question) => (
                            <Link
                                to={`/aptitude/question/${question._id}`}
                                key={question._id}
                                className="bg-gray-700 text-gray-100 p-4 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">{question.question}</h3>
                                    <span
                                        className={`${getDifficultyColor(question.difficulty)} text-sm font-medium`}
                                    >
                                        {question.difficulty}
                                    </span>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm text-gray-400">{question.topic}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    ) : (<p className="h-full flex justify-center items-center font-bold text-2xl text-center">No Questions found</p>)
                )}
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
                options={predefinedTopics}
                selectedOptions={topics}
                toggleOption={(value) => toggleSelection(topics, setTopics, value)}
            />
        </div>
    );
};

export default AptiLanding;
