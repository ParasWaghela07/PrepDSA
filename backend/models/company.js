const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    //company_id:{type:String,required:true},
    company_name:{type:String,required:true},
    question_list:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    techquestions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'TechQuestion' }]
});

const Company = mongoose.model('Company', companySchema);
module.exports=Company;