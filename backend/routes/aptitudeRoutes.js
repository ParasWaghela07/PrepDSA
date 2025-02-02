// routes/aptitudeRoutes.js

const express = require('express');
const router = express.Router();
const aptitudeController = require('../controllers/aptitudeController');

// Create new aptitude question
router.post('/create', aptitudeController.createQuestions);

// Get list of aptitude questions (with filters)
router.get('/questions', aptitudeController.getQuestions);

// Get single aptitude question by ID
router.get('/question/:id', aptitudeController.getQuestionById);

// Update an aptitude question
router.put('/question/:id', aptitudeController.updateQuestion);

// Delete an aptitude question
router.delete('/question/:id', aptitudeController.deleteQuestion);

module.exports = router;
