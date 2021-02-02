const userQueries = require('../queries/userQueries')


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userQueries.getAllUsers();
        res.status(200).json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
};

const createUser = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(user)
        const newUser = await userQueries.createUser(user)
        res.status(201).json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
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