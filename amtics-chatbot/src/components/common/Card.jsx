import React from 'react';

const Card = ({ children, className = '', padding = 'p-6' }) => {
    return (
        <div className={`bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden ${padding} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
