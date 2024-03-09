const mongoose= require('mongoose')

const MarksSchema = new mongoose.Schema({
    date: Date, 
    mark: String 
})

const MarksModel= mongoose.model('marks', MarksSchema)

module.exports={
    MarksModel
}