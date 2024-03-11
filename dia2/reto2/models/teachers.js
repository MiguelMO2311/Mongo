const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    group: [{ type: String }] // Grupos o asignaturas que enseña
});

const TeachersModel = mongoose.model('TeachersModel', teacherSchema);
module.exports = {
    TeachersModel
}