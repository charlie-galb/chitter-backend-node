const { mockRequest, mockResponse } = require('../../utils/interceptor')
const userQueries = require('../../queries/userQueries')
const controller = require('../../controllers/usersController.js')

jest.mock('../../queries/userQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("Users controller", () => {
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
    
        await controller.createUser(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Missing required fields: handle or password');
        expect(userQueries.createUser).not.toHaveBeenCalled()
    })
})