const mongoose = require('mongoose');

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
            type: String, // Topic name like "Arithmetic", "Algebra", "Geometry"
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const AptitudeQuestion = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
module.exports = AptitudeQuestion;
