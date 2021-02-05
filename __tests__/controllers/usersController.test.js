const { mockRequest, mockResponse, mockNext } = require('../../utils/interceptor')
const userQueries = require('../../queries/userQueries')
const controller = require('../../controllers/usersController.js')

jest.mock('../../queries/userQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("Create user", () => {
    test("if the request is good, it should call the correct db query, return 201 status and new user object", async () => {
        let req = mockRequest();
        req.body = {user: {handle:"Test Person", password:"NotARealPerson"}};
        const res = mockResponse();
    
        await controller.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201)
        expect(userQueries.createUser).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({id: 1, handle: "Test Person"});
    })
    test("if there is no handle or password in the request, hould return 400 status and appropriate message", async () => {
        let req = mockRequest();
        req.body = {user: {handle:"", password:""}};
        const res = mockResponse();
        const next = mockNext();
    
        await controller.createUser(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Missing required fields: handle or password');
        expect(userQueries.createUser).not.toHaveBeenCalled()
    })
    test("if there is no handle already exists in the db, hould return 409 status and appropriate message", async () => {
        let req = mockRequest();
        req.body = {user: {handle:"Test Person", password:"NotARealPerson"}};
        const res = mockResponse();
        const next = mockNext();
        userQueries.createUser.mockImplementation( () => {
            throw new Error('duplicate key value violates unique constraint "users_handle_key"')
        })
    
        await controller.createUser(req, res);
    
        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.send).toHaveBeenCalledWith('Handle already taken');
        expect(userQueries.createUser).toHaveBeenCalledTimes(1)
    })
})

describe("Get all users", () => {
    test("if the request is good, it should call the correct db query, return 200 status and an array of user objects", async () => {
        let req = mockRequest();
        const res = mockResponse();
        userQueries.getAllUsers.mockImplementation( () => {
            return {rows: [{id: 1, handle: "Test Person"}]}
        })
    
        await controller.getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(userQueries.getAllUsers).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith([{id: 1, handle: "Test Person"}]);
    })
})

describe("Delete user", () => {
    test("if the request is good, it should call the correct db query, return 200 status and an array of user objects", async () => {
        let req = mockRequest();
        const res = mockResponse();
    
        await controller.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(userQueries.deleteUser).toHaveBeenCalledTimes(1)
        expect(res.send).toHaveBeenCalledWith('User was successfully deleted');
    })
})