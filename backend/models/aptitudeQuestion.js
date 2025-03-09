const mongoose = require('mongoose');


const topicsEnum = [
    'Numbers',
    'Percentage',
    'Profit and Loss',
    'Average',
    'Ratio and Proportion',
    'Mixture and Alligation',
    'Time and Work',
    'Time Speed Distance',
    'Pipes and Cisterns',
    'Algebra',
    'Trigonometry, Height, and Distance',
    'Geometry',
    'Probability',
    'Permutation and Combination(PnC)',
    'Age'
];

const aptitudeQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: [{
            type: String,
            required: true,
        }],
        correctAnswer: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String, 
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        bookmark: {
            type: Boolean,
            default: false, 
        },
        solved: {
            type: Boolean,
            default: false, 
        },
        explanation: {
            type: String,
            default: '', 
        },
    },

);

const AptitudeQuestion = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
module.exports = AptitudeQuestion;
