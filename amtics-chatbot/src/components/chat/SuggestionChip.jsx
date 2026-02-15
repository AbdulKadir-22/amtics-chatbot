import React from 'react';

const SuggestionChip = ({ label, onClick }) => {
    return (
        <button
            onClick={() => onClick(label)}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer whitespace-nowrap shadow-sm"
        >
            {label}
        </button>
    );
};

export default SuggestionChip;
