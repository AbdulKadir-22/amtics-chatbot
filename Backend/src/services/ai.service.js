const groq = require('../config/groq');

/**
 * Service for interacting with the Groq API
 */
class AIService {
    /**
     * Generates a response from the AI assistant
     * @param {Array} messages - Array of message objects {role, content}
     * @returns {Promise<string>} AI response content
     */
    async getChatCompletion(messages) {
        try {
            const completion = await groq.chat.completions.create({
                messages,
                model: "llama-3.3-70b-versatile", // Updated from decommissioned llama3-8b-8192
                temperature: 0.7,
                max_tokens: 1024,
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Groq AI Service Error:', error);
            throw new Error('Failed to get AI response: ' + error.message);
        }
    }
}

module.exports = new AIService();
