const { saveLike, deleteLikeByForeignKeys } = require('../queries/likeQueries');

const createLike = async (req, res) => {

    const { user_id, peep_id } = req.params

    try {
        const newLike = await saveLike(peep_id, user_id)
        res.status(200).json(newLike)
    } catch (error) {
        console.error(error)
    }
};

const deleteLike = async (req, res) => {
    const { peep_id, user_id } = req.params
    try {
        await deleteLikeByForeignKeys(peep_id, user_id)
        res.status(200).send("Like successfully deleted")
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createLike,
    deleteLike
}