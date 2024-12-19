const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_id:{type:String,required:true},
    question_list:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

const Company = mongoose.model('Company', companySchema);
module.exports=Company;