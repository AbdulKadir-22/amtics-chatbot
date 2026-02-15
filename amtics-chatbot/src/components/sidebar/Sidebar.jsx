import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, LayoutGrid, MessageSquare, ShieldCheck, Database, LogOut, X, Loader2 } from 'lucide-react';
import NavItem from './NavItem';
import Button from '../common/Button';
import api from '../../api/api';

const Sidebar = ({ isOpen, onClose, user, onLogout, onChatSelect, onNewChat }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const isAdmin = user?.role === 'admin';
    const location = useLocation();

    useEffect(() => {
        if (user?.email) {
            fetchHistory();
        }
    }, [user?.email, location.pathname]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await api.get(`/chat/history?email=${user.email}`);
            if (data.success) {
                setHistory(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    const groupedHistory = useMemo(() => {
        const groups = { today: [], yesterday: [], older: [] };
        if (!Array.isArray(history)) return groups;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        history.forEach(chat => {
            if (!chat || !chat.createdAt) return;
            const chatDate = new Date(chat.createdAt);
            if (chatDate >= today) groups.today.push(chat);
            else if (chatDate >= yesterday) groups.yesterday.push(chat);
            else groups.older.push(chat);
        });
        return groups;
    }, [history]);

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#001E3C] text-slate-300 flex flex-col shrink-0 h-full transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 border-r border-slate-800
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                
                {/* 1. HEADER SECTION (Fixed) */}
                <div className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                                <LayoutGrid size={20} className="text-white" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">
                                Amtics <span className="font-light text-blue-400">AI</span>
                            </span>
                        </div>
                        <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full shadow-lg shadow-blue-600/10 bg-[#2D60FF] hover:bg-blue-600 border-none py-3 rounded-xl transition-all active:scale-[0.98]"
                        icon={Plus}
                        onClick={onNewChat}
                    >
                        New Chat
                    </Button>
                </div>

                {/* 2. SCROLLABLE CONTENT AREA */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-8 custom-scrollbar">
                    {/* Navigation */}
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 px-2">Navigation</p>
                        <div className="space-y-1">
                            <NavItem icon={ShieldCheck} label="Transparency" to="/transparency" onClick={onClose} />
                            {isAdmin && <NavItem icon={Database} label="Admin Panel" to="/admin" onClick={onClose} />}
                        </div>
                    </div>

                    {/* Chat History */}
                    <div className="pt-2">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 px-2">Recent History</p>
                        <div className="space-y-1">
                            {loading && history.length === 0 ? (
                                <div className="flex justify-center py-4"><Loader2 className="animate-spin text-blue-500" size={18} /></div>
                            ) : (
                                <>
                                    {/* Today Group */}
                                    {groupedHistory.today.map(chat => (
                                        <div key={chat._id} onClick={() => onChatSelect(chat._id)} 
                                            className="group flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 cursor-pointer hover:bg-slate-800/50 hover:text-white rounded-lg transition-all">
                                            <MessageSquare size={16} className="shrink-0 text-slate-600 group-hover:text-blue-400" />
                                            <span className="truncate">{chat.title}</span>
                                        </div>
                                    ))}
                                    
                                    {/* Yesterday Group */}
                                    {groupedHistory.yesterday.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-[10px] text-slate-600 font-bold px-3 mb-2">YESTERDAY</p>
                                            {groupedHistory.yesterday.map(chat => (
                                                <div key={chat._id} onClick={() => onChatSelect(chat._id)} 
                                                    className="group flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 cursor-pointer hover:bg-slate-800/50 hover:text-white rounded-lg transition-all">
                                                    <span className="truncate">{chat.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {history.length === 0 && !loading && (
                                        <p className="text-xs text-slate-600 italic px-3 text-center">No recent chats</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* 3. USER PROFILE SECTION (Fixed at bottom) */}
                <div className="p-4 bg-[#001A35] border-t border-slate-800 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center justify-between bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 shrink-0 shadow-lg flex items-center justify-center text-amber-900 font-bold text-lg">
                                {user?.email?.[0].toUpperCase() || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate leading-tight">
                                    {user?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-[10px] text-blue-400 truncate tracking-wide uppercase font-black mt-0.5">
                                    {user?.role || 'Guest'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;