const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quiz_marks: {type:Number,required:true},
    quiz_score:{type:Number,required:true},
    duration:{type:String,required:true}
});
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
