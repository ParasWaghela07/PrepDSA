const mongoose = require('mongoose');

const AptitudeQuestion = require('../models/AptitudeQuestion');

exports.createQuestions = async (req, res) => {
    const questions = req.body;

    try {
        const result = await AptitudeQuestion.insertMany(questions);

        res.status(201).json({
            message: `${result.length} questions added successfully`,
            questions: result
        });
    } catch (err) {
        console.error('Error adding questions:', err.message);
        res.status(500).json({
            message: 'Error adding questions',
            error: err.message
        });
    }
};
exports.getQuestions = async (req, res) => {
    const { difficulty, topic } = req.query;
    let filter = {};

    //console.log('Received query:', req.query);

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;

    try {
        const questions = await AptitudeQuestion.find(filter);
        // console.log('Fetched questions:', questions);
        console.log('questions fetched succesfully!!')
        res.status(200).json({ questions });
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
};

exports.getQuestionById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid question ID format' });
    }

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
