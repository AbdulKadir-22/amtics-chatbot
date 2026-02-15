const { Groq } = require('groq-sdk');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.GROQ_API_KEY) {
    console.warn('WARNING: GROQ_API_KEY is not defined in .env file');
}

let groq;

try {
    groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
    console.log("API key is connected");
} catch (error) {
    console.log("API key is not connected");
}

module.exports = groq;
