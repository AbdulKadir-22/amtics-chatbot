const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminUser = require('./models/AdminUser');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@amtics.com';
        const existingAdmin = await AdminUser.findOne({ email: adminEmail });

        if (!existingAdmin) {
            await AdminUser.create({
                email: adminEmail,
                role: 'admin'
            });
            console.log(`Admin user ${adminEmail} created successfully.`);
        } else {
            console.log(`Admin user ${adminEmail} already exists.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
