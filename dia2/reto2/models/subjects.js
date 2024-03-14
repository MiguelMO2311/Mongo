const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    title: { type: String },
    students:[{type:mongoose.Schema.Types.ObjectId, ref: 'StudentsModel'}]// Relación many-to-many
});

const SubjectsModel = mongoose.model('SubjectsModel', subjectSchema);

module.exports = {
    SubjectsModel
}