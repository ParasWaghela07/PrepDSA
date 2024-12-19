const mongoose = require('mongoose');

const sheetSchema = new mongoose.Schema({
    //sheet_id: { type: String, required: true },
    sheet_name: { type: String, required: true },
    question_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});
const Sheet = mongoose.model('Sheet', sheetSchema);
module.exports = Sheet;
