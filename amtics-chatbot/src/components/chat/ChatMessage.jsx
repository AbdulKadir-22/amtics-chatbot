import React from 'react';
import { LayoutGrid, FileText } from 'lucide-react';
import Badge from '../common/Badge';

const ChatMessage = ({ message }) => {
    const isBot = message.sender === 'bot';

    return (
        <div className={`flex ${isBot ? 'gap-4' : 'justify-end'}`}>
            {isBot && (
                <div className="w-8 h-8 rounded-lg bg-[#001E3C] flex items-center justify-center shrink-0">
                    <LayoutGrid size={16} className="text-white" />
                </div>
            )}

            <div className={`space-y-3 ${isBot ? 'max-w-[85%] md:max-w-2xl' : 'max-w-[85%] md:max-w-xl'}`}>
                <div className={`p-5 rounded-2xl leading-relaxed text-sm ${isBot
                    ? 'bg-[#F1F5F9] text-slate-700 rounded-tl-none'
                    : 'bg-white border border-slate-100 text-slate-800 rounded-tr-none shadow-sm'
                    }`}>
                    {message.text}
                    {message.timestamp && (
                        <p className="text-[10px] text-slate-400 mt-2 text-right">{message.timestamp}</p>
                    )}
                </div>

                {message.source && (
                    <Badge className="cursor-pointer hover:bg-blue-100 transition-colors" color="blue">
                        <FileText size={14} />
                        <span>Info Source: {message.source}</span>
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
