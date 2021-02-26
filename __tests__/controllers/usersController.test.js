const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const { saveUser, retrieveUsers, deleteUserFromDb } = require('../../src/queries/userQueries')
const { createUser, getAllUsers, deleteUser } = require('../../src/controllers/usersController.js')

jest.mock('../../src/queries/userQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("Create user", () => {
    test("if the request is good, it should call the correct db query, return 201 status and new user object", async () => {
        let req = mockRequest();
        req.body = {user: {handle:"Test Person", password:"NotARealPerson"}};
        const res = mockResponse();
    
        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201)
        expect(saveUser).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({id: 1, handle: "Test Person"});
    })
    test("if there is no handle or password in the request, hould return 400 status and appropriate message", async () => {
        let req = mockRequest();
        req.body = {user: {handle:"", password:""}};
        const res = mockResponse();
        const next = mockNext();
    
        await createUser(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Missing required fields: handle or password');
        expect(saveUser).not.toHaveBeenCalled()
    })
    test("if there is no handle already exists in the db, hould return 409 status and appropriate message", async () => {
        let req = mockRequest();
        req.body = {user: {handle:"Test Person", password:"NotARealPerson"}};
        const res = mockResponse();
        const next = mockNext();
        saveUser.mockImplementation( () => {
            throw new Error('duplicate key value violates unique constraint "users_handle_key"')
        })
    
        await createUser(req, res);
    
        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.send).toHaveBeenCalledWith('Handle already taken');
        expect(saveUser).toHaveBeenCalledTimes(1)
    })
})

describe("Get all users", () => {
    test("if the request is good, it should call the correct db query, return 200 status and an array of user objects", async () => {
        let req = mockRequest();
        const res = mockResponse();
        retrieveUsers.mockImplementation( () => {
            return {rows: [{id: 1, handle: "Test Person"}]}
        })
    
        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(retrieveUsers).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({rows:[{id: 1, handle: "Test Person"}]});
    })
})

describe("Delete user", () => {
    test("if the request is good, it should call the correct db query, return 200 status and an array of user objects", async () => {
        let req = mockRequest();
        const res = mockResponse();
    
        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(deleteUserFromDb).toHaveBeenCalledTimes(1)
        expect(res.send).toHaveBeenCalledWith('User successfully deleted');
    })
})