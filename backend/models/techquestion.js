const mongoose = require('mongoose');

const techquestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer:[{type:String,required:true}],
    companies:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    tags:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    qstImg: { type: String },
});
const TechQuestion = mongoose.model('TechQuestion', techquestionSchema);
module.exports = TechQuestion;
