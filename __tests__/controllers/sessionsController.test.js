const { mockRequest, mockResponse, mockNext } = require('../../utils/testing/interceptor')
const userQueries = require('../../queries/userQueries')
const controller = require('../../controllers/sessionsController.js')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

jest.mock('../../queries/userQueries');


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
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    })
})