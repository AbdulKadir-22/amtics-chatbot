import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ icon: Icon, label, to, onClick }) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${isActive
                    ? 'bg-[#1A365D] text-white shadow-md'
                    : 'text-slate-400 hover:bg-[#1A365D]/40 hover:text-slate-200'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span className={`${isActive ? 'text-blue-400' : 'group-hover:text-blue-300'} transition-colors`}>
                        {Icon && <Icon size={18} />}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                </>
            )}
        </NavLink>
    );
};

export default NavItem;
