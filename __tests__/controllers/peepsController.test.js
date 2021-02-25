const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const peepQueries = require('../../src/queries/peepQueries')
const controller = require('../../src/controllers/peepsController.js')

jest.mock('../../src/queries/peepQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("getAllPeeps", () => {
    test("if the request is good, it should call the correct db query, return 200 status and an array of user objects", async () => {
        let req = mockRequest();
        const res = mockResponse();
    
        await controller.getAllPeeps(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(peepQueries.getAllPeeps).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith([{"body": "mock peep", "id": 1, "user_id": 1}]);
    })
})

describe("createPeep", () => {
    test("if the request is good, it should call the correct db query, return 201 status and new peep object", async () => {
        let req = mockRequest();
        req.body = {peep: {user_id:"1", body:"Not a real peep"}};
        const res = mockResponse();
    
        await controller.createPeep(req, res);

        expect(res.status).toHaveBeenCalledWith(201)
        expect(peepQueries.createPeep).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalled;
    })
})