
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    expression: String,
    result: Number,
    date: { type: Date, default: Date.now }
});

const History = mongoose.model('History', HistorySchema);
module.exports = History;
