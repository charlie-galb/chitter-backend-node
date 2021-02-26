const { savePeep, retrievePeeps } = require('../queries/peepQueries');

const getAllPeeps = async (req, res) => {
    try {
        const allPeeps = await retrievePeeps();
        res.status(200).json(allPeeps)
    } catch (error) {
        console.error(error.message)
    }
};

const createPeep = async (req, res) => {

    const { peep } = req.body
    try {
        const newPeep = await savePeep(peep)
        res.status(201).json(newPeep)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllPeeps,
    createPeep
}