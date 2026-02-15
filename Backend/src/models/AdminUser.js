const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        default: 'admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);
