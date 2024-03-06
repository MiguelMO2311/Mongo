const mongoose= require('mongoose')

const ProfileSchema = new mongoose.Schema({
    name: String,
    surname: String,
    dateOfBirth: Date,
    comments: String,
    rol: String
})

const ProfileModel= mongoose.model('profile', ProfileSchema)

module.exports={
    ProfileModel}