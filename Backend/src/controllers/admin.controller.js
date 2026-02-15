const ingestionService = require('../services/ingestion.service');
const Document = require('../models/Document');
const asyncHandler = require('../utils/asyncHandler');

const uploadDocument = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log(`[Admin] Ingesting file: ${req.file.originalname} (${req.file.size} bytes)`);
    const result = await ingestionService.ingestFile(req.file);
    console.log(`[Admin] Ingestion complete: ${result.count} chunks created`);

    res.status(201).json({
        success: true,
        message: `Document ingested successfully into ${result.count} chunks`,
    });
});

const getDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.distinct('filename');
    res.status(200).json({ success: true, data: documents });
});

const getStats = asyncHandler(async (req, res) => {
    const totalDocs = await Document.distinct('filename');
    const lastDoc = await Document.findOne().sort({ createdAt: -1 });

    // Estimating storage (rough calculation: content length in bytes)
    const allDocs = await Document.find({}, 'content');
    const totalSize = allDocs.reduce((acc, doc) => acc + (doc.content?.length || 0), 0);
    const sizeInGB = (totalSize / (1024 * 1024 * 1024)).toFixed(2);

    res.status(200).json({
        success: true,
        data: {
            totalDocuments: totalDocs.length,
            lastUpdate: lastDoc ? lastDoc.createdAt : null,
            storageUsed: `${sizeInGB} GB`,
            quotaUsed: Math.min(Math.round((totalSize / (10 * 1024 * 1024 * 1024)) * 100), 100) // 10GB quota
        }
    });
});

const deleteDocument = asyncHandler(async (req, res) => {
    const { filename } = req.params;
    await Document.deleteMany({ filename });
    res.status(200).json({ success: true, message: `Document ${filename} deleted` });
});

module.exports = {
    uploadDocument,
    getDocuments,
    getStats,
    deleteDocument,
};
