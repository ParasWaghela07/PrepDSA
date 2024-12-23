const mongoose = require('mongoose');

const topicschema = new mongoose.Schema({
    //sheet_id: { type: String, required: true },
    topic_name: { type: String, required: true },
    question_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});
const Topic = mongoose.model('Topic', topicschema);
module.exports = Topic;
