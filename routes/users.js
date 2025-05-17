const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// GET - all users
router.get('/', usersController.getAll);

// GET - single user by ID
router.get('/:id', usersController.getSingle);

// POST - Create new user
router.post('/', usersController.createUser);

// PUT - Update user by ID
router.put('/:id', usersController.updateUser);

// DELETE - Remove user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
