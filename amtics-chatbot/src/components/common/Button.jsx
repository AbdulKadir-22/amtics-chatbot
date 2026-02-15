import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary', icon: Icon, ...props }) => {
    const variants = {
        primary: 'bg-[#001E3C] text-white hover:bg-[#002b56]',
        secondary: 'bg-[#2D60FF] text-white hover:bg-blue-600',
        outline: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-50',
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
            {...props}
        >
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
};

export default Button;
