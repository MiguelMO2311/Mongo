const mongoose= require('mongoose')

const PhotosSchema = new mongoose.Schema({
    user: String, 
    url: String,
    title: String, 
    description: String,
   
})

const PhotosModel= mongoose.model('photos', PhotosSchema)

module.exports={
    PhotosModel
}