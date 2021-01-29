const express = require('express');
const router = express.Router();
const pool = require("../db");
const { getAllUsers, createUser, deleteUser } = require('../controllers/usersController')

// get users
router.get('/', getAllUsers);
// create user
router.post('/', createUser);
// delete user
router.delete('/:id', deleteUser);

module.exports = router