const mongoose = require('mongoose');
const groq = require('../config/groq');
const Document = require('../models/Document');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Controller for system health and transparency information
 */
const getHealthStatus = asyncHandler(async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    let groqStatus = 'Disconnected';

    try {
        // Quick probe to check Groq connection
        await groq.models.list();
        groqStatus = 'Connected';
    } catch (error) {
        groqStatus = 'Error: ' + error.message;
    }

    res.status(200).json({
        success: true,
        status: {
            database: dbStatus,
            groq: groqStatus,
            system: 'Healthy',
        },
    });
});

const getSources = asyncHandler(async (req, res) => {
    const sources = await Document.aggregate([
        { $group: { _id: "$filename", chunkCount: { $sum: 1 }, lastUpdated: { $max: "$createdAt" } } }
    ]);

    res.status(200).json({
        success: true,
        sources: sources.map(s => ({
            name: s._id,
            chunks: s.chunkCount,
            lastUpdated: s.lastUpdated,
        })),
    });
});

module.exports = {
    getHealthStatus,
    getSources,
};
