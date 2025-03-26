const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/id', userController.getUserController);

// POST /users
// Body params para crear usuario
router.post('/', userController.createUser);

// PUT /users/:id
// Combina route params y body params
router.put('/:id', userController.updateUser);

module.exports = router; 