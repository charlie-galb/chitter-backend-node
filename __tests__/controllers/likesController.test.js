const { mockRequest, mockResponse, mockNext } = require('../../src/utils/testing/interceptor')
const { saveLike } = require('../../src/queries/likeQueries')
const { createLike } = require('../../src/controllers/likesController.js')

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