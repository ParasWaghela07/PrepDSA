import React from 'react';

const Questionbox = ({ question }) => {
    return (
        <div className="question-box">
            <h3>{question.question}</h3>
            <div className="options">
                {question.options.map((option, index) => (
                    <div key={index} className="option">
                        <input type="radio" name={`question-${question._id}`} id={`option-${index}`} />
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}
            </div>
            <p>Correct Answer: {question.correctAnswer}</p>
            <p>Difficulty: {question.difficulty}</p>
            <p>Topic: {question.topic}</p>
        </div>
    );
};

export default Questionbox;
