const mongoose= require('mongoose')

const studentSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'TeachersModel' }, // Relación one-to-one
    marks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MarksModel' }],// Relación one-to-many
    subjects:[{type:mongoose.Schema.Types.ObjectId, ret: 'SubjectsModel'}]// Relación many-to-many
});

const StudentsModel = mongoose.model('StudentsModel', studentSchema);
module.exports={
    StudentsModel}