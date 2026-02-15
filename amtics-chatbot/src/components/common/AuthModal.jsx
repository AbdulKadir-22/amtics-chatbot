import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import Button from './Button';
import api from '../../api/api';

const AuthModal = ({ onVerify }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await api.post('/auth/verify', { email: email.toLowerCase() });

            if (data.success) {
                onVerify(data.user);
            } else {
                setError(data.message || 'Verification failed');
            }
        } catch (err) {
            setError(err.message || 'Could not connect to server. Please ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#001E3C]/80 backdrop-blur-md">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                        <Mail size={32} />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Welcome to AcademiaBot</h2>
                        <p className="text-slate-500 mt-2">Enter your college email to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@college.edu"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-medium transition-all"
                                disabled={loading}
                            />
                            {error && <p className="text-rose-500 text-xs mt-1.5 ml-1 font-medium text-left">{error}</p>}
                        </div>

                        <Button
                            className="w-full py-4 text-lg shadow-lg shadow-blue-500/20"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    Verify Email <ArrowRight size={20} />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest px-4">
                        Admin access will be automatically detected
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
