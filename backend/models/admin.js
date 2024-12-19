const mongoose = require('mongoose');

const admin = mongoose.Schema({
    username: {type:String,required:true},
    password: { type: String, required: true },
    password2:{type:String,required:true},
    name:{type:String,required:true},
});

module.exports ={}
