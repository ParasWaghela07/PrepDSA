import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import toast from 'react-hot-toast'

function Addtechquestion() {
    const [questionTitle, setQuestionTitle] = useState("");
    const [answers, setAnswers] = useState([]);
    const [answerTemp, setAnswerTemp] = useState("");
    const [tags, setTags] = useState([]);
    const [tagTemp, setTagTemp] = useState("");
    const [image, setImage] = useState(null);

    const addAnswer = () => {
        if (answerTemp.trim() !== "") {
            setAnswers([...answers, answerTemp.trim()]);
            setAnswerTemp("");
        }
    };

    const addTag = () => {
        if (tagTemp.trim() !== "") {
            const formattedTag = tagTemp.charAt(0).toUpperCase() + tagTemp.slice(1);
            setTags([...tags, formattedTag]);
            setTagTemp("");
        }
    };

    const removeAnswer = (index) => {
        setAnswers(answers.filter((_, i) => i !== index));
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const pushToDatabase = async () => {
        const toastid=toast.loading("Adding Question..");
        const formData = new FormData();
    
        formData.append("question", questionTitle);
    
        // Append multiple answers
        answers.forEach((answer) => {
            formData.append("answers", answer);
        });
    
        // Append multiple tags
        tags.forEach((tag) => {
            formData.append("tags", tag);
        });
    
        if (image) {
            formData.append("qstImg", image);
        }
    
        const response = await fetch("http://localhost:4000/addtechquestion", {
            method: "POST",
            body: formData,
            credentials: "include"
        });
    
        const res = await response.json();
        toast.dismiss(toastid);
        if (res.success) {
            toast.success("Question added successfully!");
            setQuestionTitle("");
            setAnswers([]);
            setTags([]);
            setImage(null);
        } else {
            toast.error("Failed to add question.");
        }
    };
    
    

    return (
        <div className="bg-gray-900 min-h-screen py-8 px-4">
            <div className="max-w-3xl mx-auto p-6 bg-gray-800 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-white mb-6 text-center">Add New Question</h1>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300">Question Title</label>
                    <input
                        type="text"
                        className="w-full mt-2 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full mt-2 p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300">Answers</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md"
                            value={answerTemp}
                            onChange={(e) => setAnswerTemp(e.target.value)}
                            placeholder="Type an answer"
                        />
                        <button
                            onClick={addAnswer}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Answer
                        </button>
                    </div>
                    <ul className="mt-2 text-gray-300">
                        {answers.map((ans, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-md mt-2">
                                <span>{ans}</span>
                                <button onClick={() => removeAnswer(index)} className="text-red-500 hover:text-red-700">
                                    <RxCross1 className="font-bold text-xl"/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300">Tags</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-md"
                            value={tagTemp}
                            onChange={(e) => setTagTemp(e.target.value)}
                            placeholder="Type a tag"
                        />
                        <button
                            onClick={addTag}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Add Tag
                        </button>
                    </div>
                    <ul className="mt-2 text-gray-300 flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <li key={index} className="flex items-center justify-center bg-indigo-800 px-3 py-1 rounded-md">
                                <span>{tag}</span>
                                <button onClick={() => removeTag(index)} className="ml-2 text-red-500 hover:text-red-700 text-center">
                                    <RxCross1 className="font-bold text-xl"/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <button
                        onClick={pushToDatabase}
                        className="w-full p-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Addtechquestion;
