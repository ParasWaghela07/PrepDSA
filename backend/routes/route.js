const express=require('express');
const router=express.Router();
const {signup,login,isloggedin,logout}=require('../controllers/auth');
const {auth}=require('../middlewares/Auth');
const { adminauth } = require('../middlewares/AdminAuth');
const { addquestion, addcompany } = require('../controllers/questionroutes');

router.post('/signup',signup);
router.post('/login',login)
router.get('/isloggedin',auth,isloggedin);
router.get('/logout',logout);
router.post('/addquestion',adminauth,addquestion);
router.post('/addcompany',adminauth,addcompany);
module.exports=router;