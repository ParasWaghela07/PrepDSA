const express=require('express');
const router=express.Router();
const {signup,login,isloggedin,logout,adminlogin,adminsignup}=require('../controllers/auth');
const {auth}=require('../middlewares/Auth');
const {isAdmin}=require('../middlewares/AdminAuth');
const { addquestion, addcompany ,addsheet} = require('../controllers/Admin');


//USER'S ROUTES
router.post('/signup',signup);
router.post('/login',login)
router.get('/isloggedin',auth,isloggedin);
router.get('/logout',logout);


//ADMIN'S ROUTES
router.post('/addquestion',isAdmin,addquestion);
router.post('/addcompany',isAdmin,addcompany);
router.post('/adminlogin',adminlogin);
router.post('/addsheet',isAdmin,addsheet);
router.post('/adminsignup',adminsignup);


module.exports=router;