import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Addquestion({ allcompanies, alltopics }) {
    const {isAdmin}=useContext(AppContext); 

    const pushtodatabse = async () => {
        console.log("Redirect Links:", redirectLinks);
        console.log("Solution Links:", solution_links);

        const pushtodatabse = await fetch('http://localhost:4000/addquestion', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question_title: question_title,
                difficulty: difficulty,
                companies: companies, 
                redirect_links: redirectLinks, 
                solution_links: solution_links,
                time_complexity: time_complexity,
                topics: topics, 
            }),
            credentials: "include"
        });

        const res = await pushtodatabse.json();
        if (res.success) {
            alert('Question added successfully!');
        } else {
            alert('Failed to add question.');
        }
    }

    const addLink = () => {
        if (linkTemp.trim() !== "") {
            setRedirectLinks([...redirectLinks, linkTemp]);
            setLinkTemp("");  
        }
    };

    // Add solution link
    const addLink2 = () => {
        if (solutionTemp.trim() !== "") {
            setsolution_links([...solution_links, solutionTemp]);
            setsolutionTemp(""); 
        }
    };

    const toggleSelection = (arr, setArray, value) => {
        setArray((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    useEffect(() => {
        isAdmin();
    }, []);

    // State variables
    const [question_title, setquestion_title] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [companies, setCompanies] = useState([]);  // Stores the selected company _id(s)
    const [redirectLinks, setRedirectLinks] = useState([]);  // Store redirect links
    const [solution_links, setsolution_links] = useState([]);  // Store solution links
    const [time_complexity, settime_complexity] = useState("");
    const [topics, setTopics] = useState([]);  // Stores the selected topic _id(s)
    const [linkTemp, setLinkTemp] = useState("");
    const [solutionTemp, setsolutionTemp] = useState("");

    return (
        <div className="bg-gray-900 min-h-screen py-8 px-4">
            <div className="max-w-3xl mx-auto p-6 bg-gray-800 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-white mb-6 text-center">Add New Question</h1>

                {/* Question Title */}
                <div className="mb-6">
                    <label htmlFor="question_title" className="block text-sm font-medium text-gray-300">Question Title</label>
                    <input
                        type="text"
                        id="question_title"
                        className="w-full mt-2 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
                        value={question_title}
                        onChange={(e) => setquestion_title(e.target.value)}
                    />
                </div>

                {/* Time Complexity */}
                <div className="mb-6">
                    <label htmlFor="time_complexity" className="block text-sm font-medium text-gray-300">Time Complexity</label>
                    <input
                        type="text"
                        id="time_complexity"
                        className="w-full mt-2 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
                        value={time_complexity}
                        onChange={(e) => settime_complexity(e.target.value)}
                    />
                </div>

                {/* Redirect Links */}
                <div className="mb-6">
                    <label htmlFor="redirect_links" className="block text-sm font-medium text-gray-300">Redirect Links</label>
                    <div className="flex space-x-2 mt-2">
                        <input
                            type="text"
                            id="linktemp"
                            className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
                            value={linkTemp}
                            onChange={(e) => setLinkTemp(e.target.value)}
                        />
                        <button
                            onClick={addLink}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Link
                        </button>
                    </div>
                    {/* Display added redirect links */}
                    <ul className="mt-2 text-gray-300">
                        {redirectLinks.map((link, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <span>{link}</span>
                                <button
                                    onClick={() => {
                                        setRedirectLinks(redirectLinks.filter((l) => l !== link));
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Solution Links */}
                <div className="mb-6">
                    <label htmlFor="solution_links" className="block text-sm font-medium text-gray-300">Solution Links</label>
                    <div className="flex space-x-2 mt-2">
                        <input
                            type="text"
                            id="solnlink"
                            className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
                            value={solutionTemp}
                            onChange={(e) => setsolutionTemp(e.target.value)}
                        />
                        <button
                            onClick={addLink2}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Link
                        </button>
                    </div>
                    {/* Display added solution links */}
                    <ul className="mt-2 text-gray-300">
                        {solution_links.map((link, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <span>{link}</span>
                                <button
                                    onClick={() => {
                                        setsolution_links(solution_links.filter((l) => l !== link));
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Companies */}
                <div className="mb-6">
                    <label htmlFor="companies" className="block text-sm font-medium text-gray-300">Companies</label>
                    <select
                        id="companies"
                        className="w-full mt-2 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
                        onChange={(e) => toggleSelection(companies, setCompanies, e.target.value)}
                    >
                        <option value="">Select Companies</option>
                        {allcompanies.map((company) => (
                            <option key={company._id} value={company._id}>
                                {company.company_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Topics */}
                <div className="mb-6">
                    <label htmlFor="topics" className="block text-sm font-medium text-gray-300">Topics</label>
                    <select
                        id="topics"
                        className="w-full mt-2 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
                        onChange={(e) => toggleSelection(topics, setTopics, e.target.value)}
                    >
                        <option value="">Select Topics</option>
                        {alltopics.map((topic) => (
                            <option key={topic._id} value={topic._id}>
                                {topic.topic_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Difficulty */}
                <div className="mb-6">
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300">Difficulty</label>
                    <select
                        id="difficulty"
                        className="w-full mt-2 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:ring-indigo-500"
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="">Select Difficulty</option>
                        <option value="1">Easy</option>
                        <option value="2">Medium</option>
                        <option value="3">Hard</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        onClick={pushtodatabse}
                        className="w-full p-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Addquestion;
