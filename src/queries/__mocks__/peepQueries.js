const getAllPeeps = jest.fn().mockReturnValue([{id: 1, body: "mock peep", user_id: 1}]);

module.exports = {
    getAllPeeps 
}