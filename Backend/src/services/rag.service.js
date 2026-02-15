const Document = require('../models/Document');

/**
 * Service for Retrieval-Augmented Generation (RAG)
 */
class RAGService {
    /**
     * Simple similarity search using text overlap (optimized for Render Free Tier)
     * In a full production app, this would use vector embeddings and a vector DB.
     * @param {string} query - User question
     * @param {number} topK - Number of results to return
     */
    async getRelevantContext(query, topK = 3) {
        try {
            const documents = await Document.find();
            if (documents.length === 0) return "";

            const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);

            const scoredDocs = documents.map(doc => {
                const docContent = doc.content.toLowerCase();
                let score = 0;
                queryWords.forEach(word => {
                    if (docContent.includes(word)) score++;
                });
                return { content: doc.content, score };
            });

            return scoredDocs
                .sort((a, b) => b.score - a.score)
                .slice(0, topK)
                .map(doc => doc.content)
                .join("\n\n");
        } catch (error) {
            console.error('RAG Service Error:', error);
            return "";
        }
    }

    /**
     * Placeholder for generating embeddings if needed in the future
     */
    async generateEmbedding(text) {
        // For now, we return an empty array as we use text-based retrieval for simplicity
        return [];
    }
}

module.exports = new RAGService();
