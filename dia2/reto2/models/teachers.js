const mongoose= require('mongoose')

const TeachersSchema = new mongoose.Schema({
    title: String
})

const TeachersModel= mongoose.model('teachers', TeachersSchema)

module.exports={
    TeachersModel
}
