// routes/aptitudeRoutes.js

const express = require('express');
const router = express.Router();
const aptitudeController = require('../controllers/aptitudeController');
const { isAdmin } = require('../middlewares/AdminAuth');

router.post('/create',isAdmin, aptitudeController.createQuestions);

router.get('/questions', aptitudeController.getQuestions);

router.get('/question/:id', aptitudeController.getQuestionById);

router.put('/question/:id', aptitudeController.updateQuestion);

router.delete('/question/:id', aptitudeController.deleteQuestion);

module.exports = router;
