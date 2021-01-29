const pool = require("../db");

// get users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
};
// create user
const createUser = async (req, res) => {
    try {
        const { handle, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (handle, password) VALUES($1, $2) RETURNING *",
            [handle, password]
        );
        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
    }
};
// delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id])
        res.json("User was successfully deleted")
    } catch (error) {
        console.error(error.message)
    }
};

module.exports = {
    getAllUsers, createUser, deleteUser 
}