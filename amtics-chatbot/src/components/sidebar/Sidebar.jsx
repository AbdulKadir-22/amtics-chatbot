import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, LayoutGrid, MessageSquare, ShieldCheck, Database, LogOut, X, Loader2, Zap, Calendar } from 'lucide-react';
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
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#001E3C] text-slate-300 flex flex-col p-4 shrink-0 h-full transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:static lg:block lg:h-screen lg:top-0 lg:sticky border-r border-slate-800
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Brand & Close Button */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-700 p-1.5 rounded-lg shadow-lg">
                            <LayoutGrid size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight">
                            Academia<span className="font-normal text-slate-400">Bot</span>
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Primary Action */}
                <Button
                    variant="secondary"
                    className="mb-8 w-full shadow-lg shadow-blue-500/20 bg-[#2D60FF] hover:bg-blue-600 border-none py-3"
                    icon={Plus}
                    onClick={onNewChat}
                >
                    New Chat
                </Button>

                <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-1">
                    {/* Focus Mode Section */}

                    {/* Navigation Section */}
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 px-2">Navigation</p>
                        <div className="space-y-1.5">
                            <NavItem
                                icon={MessageSquare}
                                label="Faculty"
                                to="/"
                                onClick={onClose}
                            />
                            <NavItem
                                icon={ShieldCheck}
                                label="Transparency"
                                to="/transparency"
                                onClick={onClose}
                            />
                            {isAdmin && (
                                <NavItem
                                    icon={Database}
                                    label="Admin Panel"
                                    to="/admin"
                                    onClick={onClose}
                                />
                            )}
                        </div>
                    </div>

                    {/* Recent Queries Section */}
                    <div className="hidden lg:block pt-4">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 px-2">Recent Queries</p>
                        <div className="space-y-4 px-2">
                            {loading && history.length === 0 ? (
                                <Loader2 className="animate-spin text-slate-600 mx-auto" size={16} />
                            ) : (
                                <>
                                    {groupedHistory.today.length > 0 && (
                                        <div className="space-y-2">
                                            {groupedHistory.today.map(chat => (
                                                <div
                                                    key={chat._id}
                                                    onClick={() => onChatSelect(chat._id)}
                                                    className="group flex items-center gap-3 text-sm text-slate-400 cursor-pointer hover:text-white transition-all py-1"
                                                >
                                                    <MessageSquare size={14} className="shrink-0 text-slate-600 group-hover:text-blue-400" />
                                                    <span className="truncate">{chat.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {groupedHistory.yesterday.length > 0 && (
                                        <div className="pt-2">
                                            <p className="text-[10px] text-slate-500 font-semibold mb-2">Yesterday</p>
                                            <div className="space-y-2">
                                                {groupedHistory.yesterday.map(chat => (
                                                    <div key={chat._id} onClick={() => onChatSelect(chat._id)} className="text-sm text-slate-400 cursor-pointer hover:text-white truncate py-1">
                                                        {chat.title}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {history.length === 0 && !loading && (
                                        <p className="text-xs text-slate-600 italic">No recent chats</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* User Profile */}
                <div className="mt-auto border-t border-slate-700/50 pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-amber-200 shrink-0 shadow-inner flex items-center justify-center text-amber-800 font-bold">
                            {user?.email?.[0].toUpperCase() || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{user?.email?.split('@')[0] || 'User'}</p>
                            <p className="text-[10px] text-slate-400 truncate tracking-wide uppercase font-bold">{user?.role || 'Guest'}</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
