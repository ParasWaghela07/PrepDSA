const express=require('express');
const router=express.Router();
const {signup,login,isloggedin,logout,adminlogin,adminsignup}=require('../controllers/auth');
const {auth}=require('../middlewares/Auth');
const {isAdmin}=require('../middlewares/AdminAuth');
const { addquestion, addcompany ,addsheet,addtopic} = require('../controllers/Admin');
const { bookmark, solved, getAllQuestions,getAllCompanies,getAllTopics} = require('../controllers/userauth');


//USER'S ROUTES
router.post('/signup',signup);
router.post('/login',login)
router.get('/isloggedin',auth,isloggedin);
router.get('/logout',logout);
router.post('/bookmark',auth,bookmark)
router.post('/solved',auth,solved);
router.get('/getallquestions',getAllQuestions);
router.get('/getallcompanies',getAllCompanies);
router.get('/getalltopics',getAllTopics);

//ADMIN'S ROUTES
router.post('/addquestion',isAdmin,addquestion);
router.post('/addcompany',isAdmin,addcompany);
router.post('/adminlogin',adminlogin);
router.post('/addsheet',isAdmin,addsheet);
router.post('/adminsignup',adminsignup);
router.post('/addtopic',isAdmin,addtopic);


module.exports=router;