import React, { useEffect, useState } from 'react';
import Modal from "../components/Modal";
import { useNavigate } from 'react-router-dom';

const AptiLanding = () => {
    const [questions, setQuestions] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
    const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/api/aptitude/questions')
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data.questions);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
                setLoading(false);
            });
    }, []);

    const toggleSelection = (arr, setArray, value) => {
        setArray((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const filterQuestions = () => {
        let filteredQuestions = questions;

        if (difficulty.length > 0) {
            filteredQuestions = filteredQuestions.filter((question) =>
                difficulty.includes(question.difficulty)
            );
        }

        if (topics.length > 0) {
            filteredQuestions = filteredQuestions.filter((question) =>
                question.topics.some((topic) => topics.includes(topic.topic_name))
            );
        }

        setQuestions(filteredQuestions);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'text-green-500';
            case 'Medium':
                return 'text-yellow-500';
            case 'Hard':
                return 'text-red-500';
            default:
                return 'text-gray-500'; //JUST IN CASE if error hua
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">

            <div className="bg-gray-800 py-6 shadow-md">
                <div className="container mx-auto flex gap-6 justify-center lg:justify-between px-4">
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

                    <button
                        className="bg-indigo-500 text-white p-2 rounded-md"
                        onClick={filterQuestions}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            <div className="ml-10 mt-10">
                <input
                    type="text"
                    placeholder="Search question"
                    className="w-[30%] p-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none text-gray-100"
                />
            </div>

            <div className="container mx-auto p-6">
                {loading ? (
                    <p className="text-center text-gray-400">Loading questions...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {questions.map((question) => (
                            <div
                                key={question._id}
                                className="bg-gray-700 text-gray-100 p-4 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">{question.question_title}</h3>
                                    <span
                                        className={`${getDifficultyColor(question.difficulty)} text-sm font-medium`}
                                    >
                                        {question.difficulty}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm">{question.description}</p>
                            </div>
                        ))}
                    </div>
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
                options={["Math", "Science", "English"]}
                selectedOptions={topics}
                toggleOption={(value) => toggleSelection(topics, setTopics, value)}
            />
        </div>
    );
};

export default AptiLanding;
