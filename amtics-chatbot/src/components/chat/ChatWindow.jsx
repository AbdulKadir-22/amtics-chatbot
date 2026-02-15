import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages, isTyping }) => {
    return (
        <div className="flex-1 overflow-y-auto p-3 md:p-8 space-y-6 md:space-y-8 custom-scrollbar">
            <div className="flex justify-center">
                <span className="bg-slate-200 text-slate-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Today</span>
            </div>

            {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
            ))}

            {isTyping && (
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#001E3C] flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s] mx-0.5" />
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <div className="bg-[#F1F5F9] px-5 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <span className="text-sm text-slate-500 italic">Bot is thinking...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
