const db = require("../db/db");

const getAllUsers = () => {
    return db
      .select("id", "handle")
      .from("users")
      .then(rows => rows);
};

const createUser = (newUser) => {
    return db
      .insert(newUser)
      .into("users")
      .returning(["id", "handle"])
      .then(rows => {
        return rows[0];
      });
};

const deleteUser = (id) => {
    return db("users")
      .where({ id })
      .delete();
};

module.exports = {
    getAllUsers, createUser, deleteUser
}