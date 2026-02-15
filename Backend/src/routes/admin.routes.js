const express = require('express');
const multer = require('multer');
const { uploadDocument, getDocuments, getStats, deleteDocument } = require('../controllers/admin.controller');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/documents', getDocuments);
router.get('/stats', getStats);
router.delete('/document/:filename', deleteDocument);

module.exports = router;
