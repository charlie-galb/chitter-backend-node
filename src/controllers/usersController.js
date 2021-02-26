const { retrieveUsers, saveUser, deleteUserById } = require('../queries/userQueries');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await retrieveUsers();
        res.status(200).json(allUsers)
    } catch (error) {
        console.error(error.message)
    }
};

const createUser = async (req, res) => {

    const { user } = req.body;

    if (!user.handle || !user.password) {
        return res.status(400).send('Missing required fields: handle or password');
    }

    user.password = bcrypt.hashSync(user.password, saltRounds = 10)

    try {
        const newUser = await saveUser(user)
        res.status(201).json(newUser)
    } catch (error) {
       console.log(error.message)
        if (error.message.includes("duplicate key value violates unique constraint")) {
            return res.status(409).send("Handle already taken")
        } else {
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
              });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await deleteUserById(id)
        res.status(200).send('User successfully deleted')
    } catch (error) {
        console.error(error.message)
    }
};

module.exports = {
    getAllUsers, createUser, deleteUser
}