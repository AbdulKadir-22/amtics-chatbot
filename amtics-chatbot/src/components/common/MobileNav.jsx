import React from 'react';
import { Menu, LayoutGrid } from 'lucide-react';

const MobileNav = ({ onMenuClick }) => {
    return (
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#001E3C] text-white sticky top-0 z-30 border-b border-slate-800">
            <div className="flex items-center gap-2">
                <div className="bg-[#2D60FF] p-1.5 rounded-lg">
                    <LayoutGrid size={18} className="text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                    Academia<span className="font-light text-blue-400/80">Bot</span>
                </span>
            </div>

            <button
                onClick={onMenuClick}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle Menu"
            >
                <Menu size={24} />
            </button>
        </header>
    );
};

export default MobileNav;
