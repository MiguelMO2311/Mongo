const mongoose = require('mongoose')

const markSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    mark: { type: Number, required: true }
});

const MarksModel = mongoose.model('MarksModel', markSchema);
module.exports = {
    MarksModel
}