const express = require('express');
const router = express.Router();
const { getAllPeeps, createPeep, deletePeep } = require('../controllers/peepsController')
const verify =  require("../middleware/verify")

router.get('/', verify, getAllPeeps);
router.post('/', verify, createPeep);
router.delete('/:id', verify, deletePeep);

module.exports = router