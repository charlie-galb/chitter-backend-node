const { saveLike } = require('../queries/likeQueries');

const createLike = async (req, res) => {

    const { user_id, peep_id } = req.params
    try {
        const newLike = await saveLike(user_id, peep_id)
        res.status(200).json(newLike)
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    createLike
}