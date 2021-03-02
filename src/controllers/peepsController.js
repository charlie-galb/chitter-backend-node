const { savePeep, retrievePeeps, deletePeepById } = require('../queries/peepQueries');

const getAllPeeps = async (req, res) => {
    try {
        const allPeeps = await retrievePeeps();
        allPeeps.map( (peep) => {
            if (peep.likes === null) {
                peep.likes = []
            } else {
                peep.likes = peep.likes
            }
        })
        console.log(allPeeps)
        res.status(200).json(allPeeps)
    } catch (error) {
        console.error(error)
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

const deletePeep = async (req, res) => {
    const { id } = req.params
    try {
        await deletePeepById(id)
        res.status(200).send("Peep successfully deleted")
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllPeeps,
    createPeep,
    deletePeep
}