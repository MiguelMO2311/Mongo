const mongoose= require('mongoose')

const SubjectsSchema = new mongoose.Schema({
    title: String
})

const SubjectsModel= mongoose.model('subjects', SubjectsSchema)

module.exports={
    SubjectsModel
}