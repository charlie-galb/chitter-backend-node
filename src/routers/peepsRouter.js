const express = require('express');
const router = express.Router();
const { getAllPeeps } = require('../controllers/peepsController')

router.get('/', getAllPeeps);

module.exports = router