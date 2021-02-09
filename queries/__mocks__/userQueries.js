const bcrypt = require('bcrypt');

const hashed_password = bcrypt.hashSync("NotARealPerson", saltRounds = 10)

const getAllUsers = jest.fn().mockReturnValue([{rows:[{id: 1, handle: "Test Person"}]}]);

const createUser = jest.fn().mockReturnValue({id: 1, handle: "Test Person"});

const deleteUser = jest.fn();

const findUser = jest.fn().mockReturnValue({id: 1, handle: "Test Person", password: hashed_password});

module.exports = {
    getAllUsers, createUser, deleteUser, findUser 
}