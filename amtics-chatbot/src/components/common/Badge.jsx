import React from 'react';

const Badge = ({ children, className = '', color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        rose: 'bg-rose-50 text-rose-500',
        orange: 'bg-orange-50 text-orange-600',
        purple: 'bg-purple-50 text-purple-600',
        slate: 'bg-slate-100 text-slate-500',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${colors[color] || color} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
