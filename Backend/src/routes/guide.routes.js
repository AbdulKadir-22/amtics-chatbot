const express = require('express');
const { getHealthStatus, getSources } = require('../controllers/guide.controller');

const router = express.Router();

router.get('/health', getHealthStatus);
router.get('/sources', getSources);

module.exports = router;
