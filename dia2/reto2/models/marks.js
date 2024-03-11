const mongoose = require('mongoose')

const markSchema = new mongoose.Schema({
    date: { type: Date},
    mark: { type: Number}
});

const MarksModel = mongoose.model('MarksModel', markSchema);
module.exports = {
    MarksModel
}