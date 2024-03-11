const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    first_name: { type: String},
    last_name: { type: String },
    group: [{ type: String }], 
    students:[{type:mongoose.Schema.Types.ObjectId, ret: 'StudentsModel'}]// Relación many-to-many
});

const TeachersModel = mongoose.model('TeachersModel', teacherSchema);
module.exports = {
    TeachersModel
}