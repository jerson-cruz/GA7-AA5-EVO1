// models/Usuario.js
const mongoose = require('mongoose'); // Importa Mongoose para definir el esquema del modelo
const bcrypt = require('bcrypt'); // Importa Bcrypt para encriptar contraseñas

// Define el esquema para el modelo de Usuario
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para encriptar la contraseña antes de guardarla
UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        const salt = await bcrypt.genSalt(10); // Genera un salt para encriptar la contraseña
        user.password = await bcrypt.hash(user.password, salt); // Encripta la contraseña
    }
    next(); // Continúa con el siguiente middleware
});

module.exports = mongoose.model('User', UserSchema); // Exporta el modelo de Usuario
