// Importación de servicios
const { getUsers, updateUser, insertUser, deleteUser } = require('../services/userServices');
const { createUserValidations, updateUserValidations, getUserValidations } = require('../validations/userValidations');

const userController = {
    getUserController: [
        ...getUserValidations,
        async (req, response) => {
            try {
                const data = await getUsers();
                response.status(200).json(data);
            } catch(e) {
                console.log('Error al recoger usuario de la BBDD', e);
                response.status(500).json({ error: 'Error al recoger usuario de la BBDD' });
            }
        }
    ],

    createUser: [
        ...createUserValidations,
        async (req, response) => {
            try {
                const newUser = await insertUser(req.body);
                response.status(201).json(newUser);
            } catch(e) {
                console.log('Error al crear usuario', e);
                response.status(500).json({ error: e.message });
            }
        }
    ],

    updateUser: [
        ...updateUserValidations,
        async (req, response) => {
            try {
                const { id } = req.params;
                const userData = req.body;
                const updatedUser = await updateUser(id, userData);
                response.status(200).json(updatedUser);
            } catch(e) {
                console.log('Error al actualizar usuario', e);
                response.status(500).json({ error: 'Error al actualizar usuario' });
            }
        }
    ]
};

module.exports = userController;
