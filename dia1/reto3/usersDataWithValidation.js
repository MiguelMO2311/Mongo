const mongoose= require('mongoose')
const faker = require('@faker-js/faker');



// *********** USER  ****************
const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware: Antes de guardar, encripta la contraseña
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  // Genera una contraseña falsa utilizando faker (solo para ejemplo)
  const fakePassword = faker.internet.password();

  // Asigna la contraseña falsa encriptada al campo de contraseña
  this.password = fakePassword;

  next();
});

const UserModel = mongoose.model('User', userSchema);
 module.exports={
UserModel
 }


// ****** PROFILE ******

const profileSchema = new mongoose.Schema({
    name: String,
    surname: String,
    dateOfBirth: Date,
    comments: String,
    rol: {
      type: String,
      enum: ['Admin', 'User', 'Guest'],
      default: 'User',
    },
  });
  
  // Middleware: Antes de guardar, genera datos falsos para el perfil
  profileSchema.pre('save', function (next) {
    if (!this.isModified('name')) return next();
  
    // Genera un nombre falso utilizando faker (solo para ejemplo)
    this.name = faker.name.firstName();
  
    // Calcula la edad a partir de la fecha de nacimiento
    const birthDate = this.dateOfBirth;
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
  
    // Verifica si la persona es mayor de edad (+18)
    if (age < 18) {
      return next(new Error('El perfil debe ser de una persona mayor de edad.'));
    }
  
    next();
  });
  
  const ProfileModel = mongoose.model('Profile', profileSchema);
  
  module.exports = {
    ProfileModel,
  };
  
  
// ********** CREDENTIALS *****


const credentialsSchema = new mongoose.Schema({
  address: String,
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Validación personalizada para el formato de correo electrónico
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: 'El correo electrónico no es válido.',
    },
  },
});

// Middleware: Antes de guardar, genera datos falsos para la dirección
credentialsSchema.pre('save', function (next) {
  if (!this.isModified('address')) return next();

  // Genera una dirección falsa utilizando faker (solo para ejemplo)
  this.address = faker.address.streetAddress();

  next();
});

const CredentialsModel = mongoose.model('Credentials', credentialsSchema);

module.exports={
    CredentialsModel
     }