const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'New Chat',
    },
    userEmail: {
        type: String,
        required: true,
        index: true, // For faster lookup
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat', chatSchema);
