const getAllUsers = jest.fn().mockReturnValue([{rows:[{id: 1, handle: "Test Person"}]}]);

const createUser = jest.fn().mockReturnValue({rows:[{id: 1, handle: "Test Person"}]});

const deleteUser = jest.fn();

module.exports = {
    getAllUsers, createUser, deleteUser 
}