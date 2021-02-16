const express = require('express');
const router = express.Router();
const { getAllPeeps } = require('../controllers/peepsController')
const verify =  require("../middleware/verify")

router.get('/', verify, getAllPeeps);

module.exports = router