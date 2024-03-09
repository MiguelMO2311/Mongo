const mongoose= require('mongoose')

const TeachersSchema = new mongoose.Schema({
    first_name: String, 
    last_name: String,
    group: [String]
})

const TeachersModel= mongoose.model('teachers', TeachersSchema)

module.exports={
    TeachersModel
}