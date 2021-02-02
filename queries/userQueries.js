const pool = require("../db");

const getAllUsers = () => {
    return pool.query("SELECT * FROM users");
};

const createUser = (userData) => {
    return pool.query(
    "INSERT INTO users (handle, password) VALUES($1, $2) RETURNING user_id, handle",
    [userData.handle, userData.password]
    )
};

const deleteUser = (id) => {
    return pool.query("DELETE FROM users WHERE user_id = $1", [id])
};

module.exports = {
    getAllUsers, createUser, deleteUser 
}