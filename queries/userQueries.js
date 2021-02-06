const pool = require("../db");

const getAllUsers = () => {
    return pool.query("SELECT user_id, handle FROM users");
};

const createUser = (handle, password) => {
    return pool.query(
        "INSERT INTO users (handle, password) VALUES($1, $2) RETURNING user_id, handle",
        [handle, password]
    )
};

const deleteUser = (id) => {
    return pool.query("DELETE FROM users WHERE user_id = $1", [id])
};

module.exports = {
    getAllUsers, createUser, deleteUser 
}