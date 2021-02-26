const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const { saveLike, deleteLikeByForeignKeys } = require('../../src/queries/likeQueries')
const { createLike, deleteLike } = require('../../src/controllers/likesController.js')

jest.mock('../../src/queries/likeQueries');


afterEach(() => {
	jest.clearAllMocks();
})

describe("createPeep", () => {
    test("if the request is good, it should call the correct db query, return 201 status and new peep object", async () => {
        let req = mockRequest();
        req.params = {user_id: "1", peep_id: "2"};
        const res = mockResponse();
    
        await createLike(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(saveLike).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalled;
    })
})

describe("deleteLike", () => {
    test("if the request is good, it should call the correct db query, return 200 status and send a confirmation message", async () => {
        let req = mockRequest();
        req.params = {peep_id: 1, user_id: 2}
        const res = mockResponse();
    
        await deleteLike(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(deleteLikeByForeignKeys).toHaveBeenCalledTimes(1)
        expect(deleteLikeByForeignKeys).toHaveBeenCalledWith(1, 2)
        expect(res.send).toHaveBeenCalledWith("Like successfully deleted");
    })
})