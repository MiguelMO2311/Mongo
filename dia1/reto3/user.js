const mongoose= require('mongoose')

const UserSchema = new mongoose.Schema({
    login: String, 
    password: String,
   
})

const UserModel= mongoose.model('user', UserSchema)

module.exports={
    UserModel
}