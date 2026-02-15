const express = require('express');
const { verifyEmail } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/verify', verifyEmail);

module.exports = router;
