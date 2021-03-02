const express = require('express')
const router = express.Router()
const { getAllPeeps, createPeep, deletePeep } = require('../controllers/peepsController')
const { createLike, deleteLike } = require('../controllers/likesController')
const verify = require('../middleware/verify')

router.get('/', verify, getAllPeeps)
router.post('/', verify, createPeep)
router.delete('/:id', verify, deletePeep)

router.put('/:peep_id/likes/:user_id', verify, createLike)
router.delete('/:peep_id/likes/:user_id', verify, deleteLike)

module.exports = router
