const express=require('express');
const router=express.Router();
const {signup,login,isloggedin,logout}=require('../controllers/auth');
const {auth}=require('../middlewares/Auth');

router.post('/signup',signup);
router.post('/login',login)
router.get('/isloggedin',auth,isloggedin);
router.get('/logout',logout);

module.exports=router;