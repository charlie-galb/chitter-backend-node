const { mockRequest, mockResponse } = require('../../utils/interceptor')
jest.mock('../../queries/userQueries');
const userQueries = require('../../queries/userQueries')
const controller = require('../../controllers/usersController.js')

beforeEach( async () => {
	
})

afterEach( async () => {
	jest.unmock('../../queries/userQueries');
})

describe("Users controller", () => {
    test("createUser should call correct query, return 201 and new user data", async () => {
        console.log(userQueries.createUser)
        let req = mockRequest();
        req.body = {user: {handle:"Test Person", password:"NotARealPerson"}};
        const res = mockResponse();
    
        await controller.createUser(req, res);
    
        expect(res.status).toHaveBeenCalledWith(201)
        expect(userQueries.createUser).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({id: 1, handle: "Test Person"});
    })
})