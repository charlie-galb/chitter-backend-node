const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const { storeAuthToken, findUser } = require('../../src/queries/userQueries')
const { createNewSession } = require('../../src/controllers/sessionsController.js')

jest.mock('../../src/queries/userQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("Create new session", () => {
    test("if the request is good, it should call the correct db query, return 201 status and new user object", async () => {
        let req = mockRequest();
        req.body = {session: {handle:"Test Person", password:"NotARealPerson"}};
        const res = mockResponse();
    
        await createNewSession(req, res);

        expect(findUser).toHaveBeenCalledTimes(1)
        expect(storeAuthToken).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    })
})