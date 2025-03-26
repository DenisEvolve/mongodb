const Usuario = require('../models/User');

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

// Función para obtener todos los usuarios (Read)
async function getUsers() {
    try {
        // Aqui lanzamos la consulta a la BBDD
        const usuarios = await Usuario.find();
        console.log('Usuarios:', usuarios);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
    }
}

// Función para actualizar un usuario (Update)
async function updateUser(id, nombre, email) {
    try {
        const res = await Usuario.findByIdAndUpdate(id, { nombre, email }, { new: true });
        console.log('Usuario actualizado:', res);
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
    }
}

// Función para eliminar un usuario (Delete)
async function deleteUser(id) {
    try {
        const res = await Usuario.findByIdAndDelete(id);
        console.log('Usuario eliminado:', res);
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
    }
}

module.exports = { insertUser, getUsers, updateUser, deleteUser };