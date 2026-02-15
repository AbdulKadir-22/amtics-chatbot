import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import SuggestionChip from '../components/chat/SuggestionChip';
import { useChat } from '../hooks/useChat';
import { mockSuggestions } from '../mock/chats.mock';

const ChatPage = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { messages, sendMessage, isTyping, loadChat, startNewChat, chatId: internalChatId } = useChat(user);
    const lastInternalId = useRef(null);
    const lastLoadedId = useRef(null);

    useEffect(() => {
        if (id) {
            // Only load if it's a different ID than what's already loaded
            if (id !== lastLoadedId.current) {
                loadChat(id);
                lastLoadedId.current = id;
                lastInternalId.current = id;
            }
        } else {
            // We are at "/" - This is a New Chat
            startNewChat();
            // IMPORTANT: Reset this so we know we start fresh for loading
            lastLoadedId.current = null;
            // Note: We DON'T reset lastInternalId.current here. 
            // This prevents the redirect useEffect from triggering because 
            // internalChatId will still match lastInternalId until startNewChat (async) 
            // finishes and sets internalChatId to null.
        }
    }, [id, loadChat, startNewChat]);

    // Update URL if a new chat is created from empty state
    useEffect(() => {
        // Only redirect if we are at root (no id) AND 
        // a new internal ID was generated that we haven't seen yet
        if (!id && internalChatId && internalChatId !== lastInternalId.current) {
            navigate(`/chat/${internalChatId}`, { replace: true });
            lastInternalId.current = internalChatId;
        }
    }, [internalChatId, id, navigate]);

    return (
        <main className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
            <ChatWindow messages={messages} isTyping={isTyping} />
            <div className="p-4 md:p-6 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {mockSuggestions.map((suggestion, idx) => (
                            <SuggestionChip
                                key={idx}
                                label={suggestion}
                                onClick={sendMessage}
                            />
                        ))}
                    </div> */}
                    <ChatInput onSend={sendMessage} />
                    <p className="text-center text-[10px] text-slate-400 font-medium">
                        AI can make mistakes. Please verify important academic deadlines.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ChatPage;
