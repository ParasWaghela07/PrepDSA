const jwt=require('jsonwebtoken');
const userschema=require('../models/user')
const adminschema=require('../models/admin');
require('dotenv').config();

exports.adminauth=async(req,res,next)=>{
    next();
}