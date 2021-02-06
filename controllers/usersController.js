const userQueries = require('../queries/userQueries');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userQueries.getAllUsers();
        res.status(200).json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
};

const createUser = async (req, res) => {

    const { user } = req.body;
    const hash = bcrypt.hashSync(user.password, saltRounds = 10)
    

    if (!user.handle || !user.password) {
        return res.status(400).send('Missing required fields: handle or password');
      }

    try {
        const newUser = await userQueries.createUser(user.handle, hash)
        res.status(201).json(newUser.rows[0])
    } catch (error) {
       
        if (error.message === 'duplicate key value violates unique constraint "users_handle_key"') {
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
        const deleteUser = await userQueries.deleteUser(id)
        res.status(200).send('User successfully deleted')
    } catch (error) {
        console.error(error.message)
    }
};

module.exports = {
    getAllUsers, createUser, deleteUser 
}