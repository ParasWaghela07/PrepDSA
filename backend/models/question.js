const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_title: { type: String, required: true },
    difficulty:{type:Number,required:true},
    companies:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    redirectLinks: [{ type: String, required: true }],
    solution_links: [{ type: String, required: true }],
    time_complexity:[{type:String,required:true}],
    space_complexity:[{type:String,required:true}],
    topics:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}],
});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
