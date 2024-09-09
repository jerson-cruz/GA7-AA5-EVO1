// routes/Log.js
const express = require('express'); // Importa Express para manejar las rutas
const router = express.Router(); // Crea un enrutador Express
const User = require('../models/Usuario'); // Importa el modelo de Usuario
const bcrypt = require('bcrypt'); // Importa Bcrypt para encriptar contraseñas

// Endpoint para registrar un nuevo usuario
// Ruta: POST /Log/register
// Permite a los usuarios registrarse con un nombre de usuario y contraseña
router.post('/register', async (req, res) => {
    const { username, password } = req.body; // Obtiene los datos del usuario del cuerpo de la solicitud





    try {
        const user = new User({ username, password }); // Crea una nueva instancia de Usuario
        await user.save(); // Guarda el usuario en la base de datos
        res.status(201).json({ message: 'Usuario registrado exitosamente' }); // Respuesta de éxito
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar usuario', error }); // Respuesta de error
    }
});

///mañana cocino 


// Endpoint para iniciar sesión
// Ruta: POST /Log/login
// Permite a los usuarios iniciar sesión con nombre de usuario y contraseña
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Obtiene los datos del usuario del cuerpo de la solicitud

    try {
        const user = await User.findOne({ username }); // Busca al usuario en la base de datos
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' }); // Respuesta si el usuario no existe
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compara la contraseña ingresada con la almacenada
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' }); // Respuesta si la contraseña es incorrecta
        }

        res.status(200).json({ message: 'Autenticación satisfactoria' }); // Respuesta de éxito
    } catch (error) {
        res.status(500).json({ message: 'Error en la autenticación', error }); // Respuesta de error
    }
});

module.exports = router; // Exporta el enrutador para usarlo en App.js
