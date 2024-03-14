const mongoose= require('mongoose')

const studentSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'TeachersModel' }, // Relación one-to-one
    mark: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MarksModel' }],// Relación one-to-many
    subject:[{type:mongoose.Schema.Types.ObjectId, ref: 'SubjectsModel'}]// Relación many-to-many
});

const StudentsModel = mongoose.model('StudentsModel', studentSchema);
module.exports={
    StudentsModel}