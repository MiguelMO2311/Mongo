const mongoose = require('mongoose')

const markSchema = new mongoose.Schema({
    date: { type: Date},
    mark: { type: Number},
    students:{type:mongoose.Schema.Types.ObjectId, ret: 'StudentsModel'}// Relación one-to-one
});

const MarksModel = mongoose.model('MarksModel', markSchema);
module.exports = {
    MarksModel
}