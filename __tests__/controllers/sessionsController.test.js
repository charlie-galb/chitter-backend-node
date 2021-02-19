const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const userQueries = require('../../src/queries/userQueries')
const controller = require('../../src/controllers/sessionsController.js')
require('dotenv').config()

jest.mock('../../src/queries/userQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("Create new session", () => {
    test("if the request is good, it should call the correct db query, return 201 status and new user object", async () => {
        let req = mockRequest();
        req.body = {session: {handle:"Test Person", password:"NotARealPerson"}};
        const res = mockResponse();
    
        await controller.createNewSession(req, res);

        expect(userQueries.findUser).toHaveBeenCalledTimes(1)
        expect(userQueries.storeAuthToken).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    })
})