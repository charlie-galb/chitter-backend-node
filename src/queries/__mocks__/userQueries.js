const bcrypt = require('bcrypt');

const hashed_password = bcrypt.hashSync("NotARealPerson", saltRounds = 10)

const retrieveUsers = jest.fn().mockReturnValue([{rows:[{id: 1, handle: "Test Person"}]}]);

const saveUser = jest.fn().mockReturnValue({id: 1, handle: "Test Person"});

const deleteUserFromDb = jest.fn();

const findUser = jest.fn().mockReturnValue({id: 1, handle: "Test Person", password: hashed_password});

const storeAuthToken = jest.fn();

module.exports = {
    retrieveUsers, saveUser, deleteUserFromDb, findUser, storeAuthToken 
}