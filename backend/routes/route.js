const express=require('express');
const multer = require('multer');
const router=express.Router();
const {signup,login,isloggedin,logout,adminlogin,adminsignup,resetpassword,resetpasswordtoken}=require('../controllers/auth');
const {auth}=require('../middlewares/Auth');
const {isAdmin}=require('../middlewares/AdminAuth');
const { addquestion, addcompany ,addsheet,addtopic, isAdminloggedin} = require('../controllers/Admin');
const { bookmark, solved, getAllQuestions,getAllCompanies,getAllTopics, checksolvestatus, checkbookmarkstatus, popfrombookmark,getUserDetail,changeProfilePic} =require('../controllers/User_fn');

const upload = multer({ 
    dest: 'uploads/', 
    fields: [{ name: 'file', maxCount: 1 }]  // Ensure 'file' is the correct field name
  });
  



//USER'S ROUTES
router.post('/signup',signup);
router.post('/login',login)
router.get('/isloggedin',auth,isloggedin);
router.get('/getuserdetail',auth,getUserDetail);

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
router.post('/changeProfilePic', auth,upload.single('imgfile'), changeProfilePic);


//ADMIN'S ROUTES
router.get('/isadminloggedin',isAdmin,isAdminloggedin);
router.post('/addquestion',isAdmin,addquestion);
router.post('/addcompany',isAdmin,addcompany);
router.post('/adminlogin',adminlogin);
router.post('/addsheet',isAdmin,addsheet);
router.post('/adminsignup',adminsignup);
router.post('/addtopic',isAdmin,addtopic);


module.exports=router;