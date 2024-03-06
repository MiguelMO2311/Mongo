const mongoose= require('mongoose')


const {UserModel}=require('./user')
const {ProfileModel}=require('./profile')
const {CredentialsModel}=require('./credentials')

// const {UserModel}=require('./usersDataWithValidation.js')
// const {ProfileModel}=require('./usersDataWithValidation.js')
// const {CredentialsModel}=require('./usersDataWithValidation.js')


const urlLocal = 'mongodb://localhost:27017/users';
const urlRemoto = 'mongodb+srv://mmeneses73:' + encodeURIComponent('Meneses23') + '@cluster0.uydobrj.mongodb.net/';


// Para conectar a la BD, si no existe, la crea.
mongoose.connect(urlRemoto);


//Creo mi USUARIO
const user = new UserModel({
    login: "Pepe1234",
    password: "Pp1234"
})

//guardo mi USUARIO en la BBDDD sino da error.
user.save().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

// Creo mi PERFIL

const profile = new ProfileModel({
    name: "Pepe",
    surname: "Perez",
    dateOfBirth:"2000/12/03",
    comments: "honorable mentions",
    rol: "develloper"
})

//guardo mi PERFIL en la BBDDD sino da error.
profile.save().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
//Creo mis CREDENCIALES
const credentials = new CredentialsModel({
    address: "Gran Via 17, 9B",
    phone: "111111111",
    email: "pepe@gmail.com"
 
})

//guardo mis CREDENCIALES en la BBDDD sino da error.
credentials.save().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
