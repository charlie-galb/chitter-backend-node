const express = require('express');
const router = express.Router();
const { createNewSession } = require('../controllers/sessionsController')

router.post('/', createNewSession);

module.exports = router
