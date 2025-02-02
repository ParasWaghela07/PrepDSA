
const AptitudeQuestion = require('../models/aptitudeQuestion.js');

exports.createQuestion = async (req, res) => {
    const { question, options, correctAnswer, difficulty, topic } = req.body;
    try {
        const newQuestion = new AptitudeQuestion({
            question,
            options,
            correctAnswer,
            difficulty,
            topic,
        });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (err) {
        res.status(500).json({ message: 'Error adding question', error: err.message });
    }
};

exports.getQuestions = async (req, res) => {
    const { difficulty, topic } = req.query;
    let filter = {};

    console.log('Received query:', req.query); // Log the query parameters

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;

    try {
        const questions = await AptitudeQuestion.find(filter);
        console.log('Fetched questions:', questions); // Log fetched questions
        res.status(200).json({ questions });
    } catch (err) {
        console.error('Error fetching questions:', err); // Log any errors
        res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
};

// Get a single aptitude question by ID
exports.getQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await AptitudeQuestion.findById(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ question });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching question', error: err.message });
    }
};

// Update an aptitude question
exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { question, options, correctAnswer, difficulty, topic } = req.body;
    try {
        const updatedQuestion = await AptitudeQuestion.findByIdAndUpdate(
            id,
            { question, options, correctAnswer, difficulty, topic },
            { new: true }
        );
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
    } catch (err) {
        res.status(500).json({ message: 'Error updating question', error: err.message });
    }
};

// Delete an aptitude question
exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuestion = await AptitudeQuestion.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting question', error: err.message });
    }
};
