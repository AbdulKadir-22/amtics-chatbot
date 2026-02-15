const AdminUser = require('../models/AdminUser');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Verifies if an email belongs to an admin or a regular student
 */
const verifyEmail = asyncHandler(async (req, res) => {
    let { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    email = email.trim().toLowerCase();

    const admin = await AdminUser.findOne({ email });

    if (admin) {
        return res.status(200).json({
            success: true,
            role: 'admin',
            user: { email: admin.email, role: 'admin' }
        });
    }

    // Default to student role for any other email
    return res.status(200).json({
        success: true,
        role: 'student',
        user: { email, role: 'student' }
    });
});

module.exports = {
    verifyEmail,
};
