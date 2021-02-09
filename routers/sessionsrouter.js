const express = require('express');
const router = express.Router();
const pool = require("../db/db");
const { createNewSession } = require('../controllers/sessionsController')

router.post('/', createNewSession);

module.exports = router