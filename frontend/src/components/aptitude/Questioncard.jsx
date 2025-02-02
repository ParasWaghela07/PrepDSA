import React from 'react';

const QuestionCard = ({ question }) => {
    return (
        <div>
            <h3>{question.question}</h3>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionCard;  // Default export
