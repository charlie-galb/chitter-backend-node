const peepQueries = require('../queries/peepQueries');

const getAllPeeps = async (req, res) => {
    try {
        const allPeeps = await peepQueries.getAllPeeps();
        res.status(200).json(allPeeps)
    } catch (error) {
        console.error(error.message)
    }
};

module.exports = {
    getAllPeeps
}