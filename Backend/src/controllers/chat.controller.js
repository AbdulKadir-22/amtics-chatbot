const Chat = require('../models/Chat');
const Message = require('../models/Message');
const aiService = require('../services/ai.service');
const ragService = require('../services/rag.service');
const cacheService = require('../services/cache.service');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Controller for chat interactions
 */
const handleChat = asyncHandler(async (req, res) => {
    const { message, chatId, email } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required' });
    }

    if (!email) {
        return res.status(400).json({ success: false, message: 'User email is required' });
    }

    console.log(`[Chat] Processing message for ${email}: "${message.substring(0, 50)}..." chatId: ${chatId || 'new'}`);

    // 1. Check Cache
    const normalizedMessage = message.trim().toLowerCase();
    const cachedResponse = cacheService.get(normalizedMessage);
    if (cachedResponse) {
        console.log('[Chat] Cache hit');
        return res.status(200).json({ success: true, response: cachedResponse, cached: true });
    }

    // 2. Identify or Create Chat
    let chat;
    if (chatId && chatId !== 'undefined' && chatId !== 'null') {
        try {
            chat = await Chat.findOne({ _id: chatId, userEmail: email.toLowerCase() });
            if (!chat) {
                console.warn(`[Chat] Unauthorized or non-existent chatId: ${chatId} for user ${email}`);
            }
        } catch (err) {
            console.warn(`[Chat] Error finding chatId: ${chatId}`);
        }
    }

    if (!chat) {
        chat = await Chat.create({
            title: message.substring(0, 30) + '...',
            userEmail: email.toLowerCase()
        });
        console.log(`[Chat] Created new chat for ${email}: ${chat._id}`);
    }

    // 3. Save User Message
    await Message.create({ chatId: chat._id, role: 'user', content: message });

    // 4. Retrieve Context (RAG)
    console.log('[Chat] Retrieving RAG context...');
    const context = await ragService.getRelevantContext(message);

    // 5. Get Previous History (last 5 messages)
    const history = await Message.find({ chatId: chat._id })
        .sort({ createdAt: -1 })
        .limit(6); // current user msg + 5 previous

    const formattedHistory = history.reverse().map(m => ({ role: m.role, content: m.content }));

    // 6. Build Prompt with Context
    const systemPrompt = `You are a helpful College Assistant for AMTICS (Asha M Tarsadia Institute of Computer Science). Use the following context to answer the student's question accurately. If you don't know the answer based on the context, say you don't know based on available info.
  
  Context:
  ${context}`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...formattedHistory
    ];

    // 7. Get AI Response
    console.log('[Chat] Requesting completion from Groq...');
    const aiResponse = await aiService.getChatCompletion(messages);

    // 8. Save AI Message
    await Message.create({ chatId: chat._id, role: 'assistant', content: aiResponse });

    // 9. Cache Response
    cacheService.set(normalizedMessage, aiResponse);

    console.log('[Chat] Success');
    res.status(200).json({
        success: true,
        chatId: chat._id,
        response: aiResponse,
    });
});

const getChatHistory = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email query parameter is required' });
    }

    const chats = await Chat.find({ userEmail: email.toLowerCase() }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: chats });
});

const getChatMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email query parameter is required' });
    }

    // Verify chat belongs to user
    const chat = await Chat.findOne({ _id: chatId, userEmail: email.toLowerCase() });
    if (!chat) {
        return res.status(404).json({ success: false, message: 'Chat not found or unauthorized' });
    }

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: messages });
});

module.exports = {
    handleChat,
    getChatHistory,
    getChatMessages
};
