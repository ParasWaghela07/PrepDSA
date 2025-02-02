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
            type: String, // Easy, Medium, Hard
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        bookmark: {
            type: Boolean,
            default: false, // Initially false, can be updated when bookmarked
        },
        solved: {
            type: Boolean,
            default: false, // Initially false, can be updated when solved
        },
        explanation: {
            type: String,
            default: '', // Empty string if no explanation is provided
        },
    },

);

const AptitudeQuestion = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
module.exports = AptitudeQuestion;
