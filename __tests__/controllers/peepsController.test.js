const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const { retrievePeeps, savePeep, deletePeepById } = require('../../src/queries/peepQueries')
const { getAllPeeps, createPeep, deletePeep } = require('../../src/controllers/peepsController.js')

jest.mock('../../src/queries/peepQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("getAllPeeps", () => {
    test("if the request is good, it should call the correct db query, return 200 status and an array of user objects", async () => {
        let req = mockRequest();
        const res = mockResponse();
    
        await getAllPeeps(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(retrievePeeps).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith([{"body": "mock peep", "id": 1, "user_id": 1}]);
    })
})

describe("createPeep", () => {
    test("if the request is good, it should call the correct db query, return 201 status and new peep object", async () => {
        let req = mockRequest();
        req.body = {peep: {user_id:"1", body:"Not a real peep"}};
        const res = mockResponse();
    
        await createPeep(req, res);

        expect(res.status).toHaveBeenCalledWith(201)
        expect(savePeep).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalled;
    })
})

describe("deletePeep", () => {
    test("if the request is good, it should call the correct db query, return 200 status and send a confirmation message", async () => {
        let req = mockRequest();
        req.params = {id: 1}
        const res = mockResponse();
    
        await deletePeep(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(deletePeepById).toHaveBeenCalledTimes(1)
        expect(deletePeepById).toHaveBeenCalledWith(1)
        expect(res.send).toHaveBeenCalledWith("Peep successfully deleted");
    })
})