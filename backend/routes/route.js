const express=require('express');
const router=express.Router();
const {signup,login,isloggedin,logout,adminlogin,adminsignup,resetpassword,resetpasswordtoken}=require('../controllers/auth');
const {auth}=require('../middlewares/Auth');
const {isAdmin}=require('../middlewares/AdminAuth');
const { addquestion, addcompany ,addsheet,addtopic, isAdminloggedin} = require('../controllers/Admin');
const { bookmark, solved, getAllQuestions,getAllCompanies,getAllTopics, checksolvestatus, checkbookmarkstatus, popfrombookmark} =require('../controllers/User_fn');


//USER'S ROUTES
router.post('/signup',signup);
router.post('/login',login)
router.get('/isloggedin',auth,isloggedin);

router.get('/logout',logout);

router.post('/resetpasswordtoken',resetpasswordtoken);
router.post('/resetpassword',resetpassword);

router.post('/bookmark',auth,bookmark)
router.post('/solved',auth,solved);
router.get('/getallquestions',getAllQuestions);
router.get('/getallcompanies',getAllCompanies);
router.get('/getalltopics',getAllTopics);
router.post('/checksolvestatus',auth,checksolvestatus);
router.post('/checkbookmarkstatus',auth,checkbookmarkstatus);
router.post('/popfrombookmark',auth,popfrombookmark);


//ADMIN'S ROUTES
router.get('/isadminloggedin',isAdmin,isAdminloggedin);
router.post('/addquestion',isAdmin,addquestion);
router.post('/addcompany',isAdmin,addcompany);
router.post('/adminlogin',adminlogin);
router.post('/addsheet',isAdmin,addsheet);
router.post('/adminsignup',adminsignup);
router.post('/addtopic',isAdmin,addtopic);


module.exports=router;