const mongoose= require('mongoose')

const credentialsSchema = new mongoose.Schema({
    address: String, 
     phone:  Number,
     role: String,
    email: String
})

const CredentialsModel = mongoose.model('credentials', credentialsSchema)

module.exports={
    CredentialsModel
}