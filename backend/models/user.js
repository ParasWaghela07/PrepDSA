const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    //question_count: { type: Number, required: true },
    easy_question_count: { type: Number, required: true },
    medium_question_count: { type: Number, required: true },
    hard_question_count: { type: Number, required: true },
    daily_streak: { type: Number, required: true },
    badges:{type:Number},
    solved_question_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const User = mongoose.model('User', userSchema);
module.exports=User;