const express = require('express');
const techRoutes = express.Router();
const {addtechquestion}=require('../controllers/Admin');
const {getAllTags,getAllTechQuestions,getTechQuestionDetail,getTagDetail}=require('../controllers/TechQuestions');
const { isAdmin } = require('../middlewares/AdminAuth');

techRoutes.get('/getAllTags',getAllTags);
techRoutes.get('/getAllTechQuestions',getAllTechQuestions);
techRoutes.post('/getTechQuestionDetail',getTechQuestionDetail);
techRoutes.post('/getTagDetail',getTagDetail);

// techRoutes.post('/addtag',isAdmin,addtag);
techRoutes.post('/addtechquestion',isAdmin,addtechquestion);


module.exports = techRoutes;