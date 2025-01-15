const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    userImg: { type: String, required: true },
    easy_question_count: { type: Number, default: 0 },
    medium_question_count: { type: Number, default: 0 },
    hard_question_count: { type: Number, default: 0 },
    daily_streak: { type: Number, default: 0 },
    solved_question_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    bookmarkedquestions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
