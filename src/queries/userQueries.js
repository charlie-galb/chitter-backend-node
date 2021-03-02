const db = require('../../db/db')

const retrieveUsers = () => {
  return db
    .select('id', 'handle')
    .from('users')
    .then(rows => rows)
}

const saveUser = (newUser) => {
  return db
    .insert(newUser)
    .into('users')
    .returning(['id', 'handle'])
    .then(rows => {
      return rows[0]
    })
}

const deleteUserById = (id) => {
  return db('users')
    .where({ id })
    .delete()
}

const findUserByHandle = (handle) => {
  return db
    .select('id', 'handle', 'password')
    .from('users')
    .where({ handle: handle })
    .then(rows => rows[0])
}

const storeAuthToken = (handle, authToken) => {
  return db('users')
    .where({ handle: handle })
    .update({ auth_token: authToken })
    .returning(['id', 'handle'])
    .then(rows => rows[0])
}

module.exports = {
  retrieveUsers, saveUser, deleteUserById, findUserByHandle, storeAuthToken
}
