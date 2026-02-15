import { useState, useCallback } from 'react';
import api from '../api/api';

export const useChat = (user) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [chatId, setChatId] = useState(null);

    const loadChat = useCallback(async (selectedChatId) => {
        if (!user?.email || !selectedChatId) return;

        setChatId(selectedChatId);
        setIsTyping(true);
        try {
            const data = await api.get(`/chat/${selectedChatId}?email=${user.email}`);
            if (data.success) {
                const formattedMessages = data.data.map(m => ({
                    id: m._id,
                    sender: m.role === 'user' ? 'user' : 'bot',
                    text: m.content,
                    timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error('Load Chat Error:', error);
        } finally {
            setIsTyping(false);
        }
    }, [user?.email]);

    const startNewChat = useCallback(() => {
        setMessages([]);
        setChatId(null);
    }, []);

    const sendMessage = useCallback(async (text) => {
        if (!text.trim() || !user?.email) return;

        // Add user message locally
        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const data = await api.post('/chat', {
                message: text,
                email: user.email,
                chatId: chatId
            });

            if (data.success) {
                if (!chatId) setChatId(data.chatId);

                const botResponse = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: data.response,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages((prev) => [...prev, botResponse]);
            }
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMessage = {
                id: Date.now() + 2,
                sender: 'bot',
                text: 'Sorry, I am having trouble connecting to the brain. Please try again later.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [user?.email, chatId]);

    return {
        messages,
        sendMessage,
        isTyping,
        chatId,
        loadChat,
        startNewChat
    };
};
