/**
 * Simple text chunking utility
 * @param {string} text - The text to chunk
 * @param {number} chunkSize - Approximate number of tokens/chars per chunk
 * @returns {string[]} Array of text chunks
 */
const chunkText = (text, chunkSize = 800) => {
    if (!text) return [];

    const sentences = text.split(/[.!?]\s+/);
    const chunks = [];
    let currentChunk = "";

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > chunkSize && currentChunk !== "") {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
        } else {
            currentChunk += (currentChunk === "" ? "" : " ") + sentence;
        }
    }

    if (currentChunk !== "") {
        chunks.push(currentChunk.trim());
    }

    return chunks;
};

module.exports = chunkText;
