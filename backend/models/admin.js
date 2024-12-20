const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email:{type:String,required:true},
    username: {type:String,required:true},
    password1: { type: String, required: true },
    password2:{type:String,required:true},
    name:{type:String,required:true},
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports=Admin