const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const peepQueries = require('../../src/queries/peepQueries')
const controller = require('../../src/controllers/peepsController.js')

jest.mock('../../src/queries/peepQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("Get all users", () => {
    test("if the request is good, it should call the correct db query, return 200 status and an array of user objects", async () => {
        let req = mockRequest();
        const res = mockResponse();
    
        await controller.getAllPeeps(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(peepQueries.getAllPeeps).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith([{"body": "mock peep", "id": 1, "user_id": 1}]);
    })
})