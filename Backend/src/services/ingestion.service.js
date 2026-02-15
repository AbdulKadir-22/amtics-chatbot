const pdf = require('pdf-parse');
const csv = require('csv-parser');
const fs = require('fs');
const { Readable } = require('stream');
const chunkText = require('../utils/chunkText');
const Document = require('../models/Document');

/**
 * Service for handling file parsing and data ingestion
 */
class IngestionService {
    /**
     * Parses PDF or CSV and stores chunks in MongoDB
     */
    async ingestFile(file) {
        let text = "";

        const isPDF = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');
        const isCSV = file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel' || file.originalname.toLowerCase().endsWith('.csv');

        if (isPDF) {
            const data = await pdf(file.buffer);
            text = data.text;
        } else if (isCSV) {
            text = await this.parseCSV(file.buffer);
        } else {
            throw new Error(`Unsupported file type: ${file.mimetype}. Please upload PDF or CSV.`);
        }

        const chunks = chunkText(text, 800);

        const docPromises = chunks.map(chunk => {
            return Document.create({
                filename: file.originalname,
                content: chunk,
                metadata: { source: file.originalname },
            });
        });

        await Promise.all(docPromises);
        return { count: chunks.length };
    }

    async parseCSV(buffer) {
        return new Promise((resolve, reject) => {
            const results = [];
            const stream = Readable.from(buffer.toString());
            stream
                .pipe(csv())
                .on('data', (data) => results.push(JSON.stringify(data)))
                .on('end', () => resolve(results.join("\n")))
                .on('error', (err) => reject(err));
        });
    }
}

module.exports = new IngestionService();
