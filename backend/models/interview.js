const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    interview_marks: {type:Number,required:true},
    interview_score:{type:Number,required:true},
    company:{type:String},
    duration:{type:String,required:true},
    attended_at:{ type: Date, default: Date.now },
    given_by:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
});
const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;
