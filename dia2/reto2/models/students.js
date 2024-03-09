const mongoose= require('mongoose')

const StudentsSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String
})

const StudentsModel= mongoose.model('students', StudentsSchema)

module.exports={
    StudentsModel
}