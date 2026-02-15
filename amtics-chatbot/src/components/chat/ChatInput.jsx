import React, { useState } from 'react';
import { Paperclip, Zap } from 'lucide-react';
import Button from '../common/Button';

const ChatInput = ({ onSend, placeholder = "Ask about classes, faculty, or events..." }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="relative flex items-center">
            <Paperclip className="absolute left-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" size={20} />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-16 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
                onClick={handleSend}
                className="absolute right-3 bg-[#001E3C] text-white p-2 rounded-xl hover:bg-[#002b56] transition-colors"
            >
                <Zap size={20} fill="currentColor" />
            </button>
        </div>
    );
};

export default ChatInput;
