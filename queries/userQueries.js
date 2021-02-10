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

const findUser = (user) => {
  return db
      .select("id", "handle", "password")
      .from("users")
      .where({ handle: user.handle })
      .then(rows => rows[0]);
}

const storeAuthToken = (handle, authToken) => {
  return db("users")
      .where({ handle: handle })
      .update({auth_token: authToken})
      .returning(["id", "handle"])
      .then(rows => rows[0]);
}

module.exports = {
    getAllUsers, createUser, deleteUser, findUser, storeAuthToken
}