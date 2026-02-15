const express = require('express');
const { handleChat, getChatHistory, getChatMessages } = require('../controllers/chat.controller');
const apiLimiter = require('../middleware/rateLimit');

const router = express.Router();

router.post('/', apiLimiter, handleChat);
router.get('/history', getChatHistory);
router.get('/:chatId', getChatMessages);

module.exports = router;
