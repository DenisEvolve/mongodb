const Usuario = require('../models/User');

// Crear un nuevo usuario
async function insertUser(userData) {
    try {
        const usuario = new Usuario(userData);
        const res = await usuario.save();
        console.log('Usuario insertado:', res);
        return res;
    } catch (err) {
        console.error('Error al insertar usuario:', err);
        throw err;
    }
}

// Obtener todos los usuarios
async function getUsers() {
    try {
        const usuarios = await Usuario.find();
        console.log('Usuarios:', usuarios);
        return usuarios;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
}

// Actualizar un usuario
async function updateUser(id, userData) {
    try {
        // Añadir fecha de última actualización
        userData.ultimaActualizacion = new Date();
        
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            userData,
            { 
                new: true,
                runValidators: true // Ejecuta las validaciones del esquema
            }
        );

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        console.log('Usuario actualizado:', usuario);
        return usuario;
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        throw err;
    }
}

// Eliminar un usuario
async function deleteUser(id) {
    try {
        const usuario = await Usuario.findByIdAndDelete(id);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        console.log('Usuario eliminado:', usuario);
        return usuario;
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        throw err;
    }
}

module.exports = { 
    insertUser, 
    getUsers, 
    updateUser, 
    deleteUser 
};