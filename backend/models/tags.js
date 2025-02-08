const mongoose = require('mongoose');

const tagschema = new mongoose.Schema({
    tag_name: { type: String, required: true },
    question_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TechQuestion' }],
});
const Tag = mongoose.model('Tag', tagschema);
module.exports = Tag;
