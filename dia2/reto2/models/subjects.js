const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title: { type: String, required: true }
});

const SubjectsModel = mongoose.model('SubjectsModel', subjectSchema);

module.exports = {
    SubjectsModel
}