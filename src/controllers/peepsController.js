const peepQueries = require('../queries/peepQueries');

const getAllPeeps = async (req, res) => {
    try {
        const allPeeps = await peepQueries.getAllPeeps();
        res.status(200).json(allPeeps)
    } catch (error) {
        console.error(error.message)
    }
};

const createPeep = async (req, res) => {

    const { peep } = req.body
    try {
        const newPeep = await peepQueries.createPeep(peep)
        res.status(201).json(newPeep)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllPeeps,
    createPeep
}