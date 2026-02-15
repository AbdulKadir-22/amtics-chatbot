import React, { useState, useEffect } from 'react';
import { BookOpen, Zap, Database, ShieldCheck, ChevronRight, XCircle, CheckCircle2 } from 'lucide-react';
import KnowledgeCard from '../components/guide/KnowledgeCard';
import StatusInfo from '../components/guide/StatusInfo';
import RequestForm from '../components/guide/RequestForm';
import Badge from '../components/common/Badge';
import api from '../api/api';

const TransparencyPage = () => {
    const [health, setHealth] = useState({ database: '...', groq: '...', system: '...' });
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [healthRes, sourcesRes] = await Promise.all([
                    api.get('/guide/health'),
                    api.get('/guide/sources')
                ]);

                if (healthRes.success) setHealth(healthRes.status);
                if (sourcesRes.success && Array.isArray(sourcesRes.sources)) {
                    const formattedSources = sourcesRes.sources.map((s, idx) => ({
                        id: idx,
                        name: s.name || 'Unnamed Source',
                        type: s.name?.endsWith('.pdf') ? 'PDF Document' : 'CSV Dataset',
                        description: `Contains ${s.chunks || 0} indexed information chunks for the AI.`,
                        color: s.name?.endsWith('.pdf') ? 'rose' : 'emerald',
                        sync: s.lastUpdated ? new Date(s.lastUpdated).toLocaleDateString() : 'Recent'
                    }));
                    setSources(formattedSources);
                }
            } catch (error) {
                console.error('Transparency Fetch Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const healthStatus = [
        { id: 1, type: 'engine', label: 'Groq Engine', sub: 'Inference Model', status: health.groq, color: health.groq === 'Connected' ? 'text-emerald-500' : 'text-rose-500' },
        { id: 2, type: 'database', label: 'Vector DB', sub: 'Knowledge Base', status: health.database, color: health.database === 'Connected' ? 'text-emerald-500' : 'text-rose-500' },
        { id: 3, type: 'system', label: 'Guardrails', sub: 'Content Filter', status: 'Active', color: 'text-emerald-500' },
    ];
    return (
        <div className="min-h-screen bg-[#F8FAFC] p-3 md:p-8 font-sans text-slate-700 w-full overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-8 md:mb-12">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#001E3C] mb-3 tracking-tight">Bot Transparency & Guide</h1>
                    <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed">
                        See exactly what the AI knows, where it learns from, and how to get the best answers for your studies.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                    {/* Left Column: Knowledge Map & How-To */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-10">

                        {/* Knowledge Map Section */}
                        <section>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                                        <BookOpen size={20} />
                                    </div>
                                    <h2 className="font-bold text-slate-800 text-lg">Knowledge Map</h2>
                                </div>
                                <Badge color="blue" className="scale-90 sm:scale-100">{sources.length} Verified Sources</Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                {sources.map(source => (
                                    <KnowledgeCard key={source.id} source={source} />
                                ))}
                            </div>

                            {/* Featured Source Card removed for simplicity with real data */}
                        </section>

                        {/* How to Ask Section */}
                        <section className="bg-white border border-slate-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Zap size={20} />
                                </div>
                                <h2 className="font-bold text-slate-800 text-lg">'How to Ask' Guide</h2>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Prompt Library: Finding Faculty</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Don't Ask */}
                                    <div className="border-l-4 border-rose-400 bg-rose-50/30 p-4 md:p-6 rounded-r-2xl">
                                        <div className="flex items-center gap-2 text-rose-600 text-[10px] font-bold uppercase mb-3">
                                            <XCircle size={14} /> Don't Ask
                                        </div>
                                        <p className="italic font-medium text-slate-800 mb-2">"Tell me about teachers."</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">Too vague. The bot will struggle to know which department or context you need.</p>
                                    </div>

                                    {/* Do Ask */}
                                    <div className="border-l-4 border-emerald-400 bg-emerald-50/30 p-4 md:p-6 rounded-r-2xl">
                                        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase mb-3">
                                            <CheckCircle2 size={14} /> Do Ask
                                        </div>
                                        <p className="italic font-medium text-slate-800 mb-2">"Who are the CS faculty specializing in AI?"</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">Specific and targeted. Uses keywords like 'CS' and 'AI' found in the vector database.</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <span className="text-[10px] md:text-xs text-slate-400 font-medium italic bg-slate-50 px-3 py-1.5 rounded-lg">
                                        Tip: Try asking about prerequisites, office hours, or lab safety for more accurate results.
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Status & Resources */}
                    <div className="space-y-8 md:col-span-1 lg:col-span-1">
                        {/* Bot Health Widget */}
                        <div className="bg-white border border-slate-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-tight">Bot Health</h3>
                                <Badge color="emerald" className="scale-90">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Systems Normal
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                {healthStatus.map(status => (
                                    <StatusInfo
                                        key={status.id}
                                        icon={
                                            status.type === 'engine' ? Zap :
                                                status.type === 'database' ? Database : ShieldCheck
                                        }
                                        label={status.label}
                                        sub={status.sub}
                                        status={status.status}
                                        color={status.color}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Request Form */}
                        <RequestForm />

                        {/* Useful Resources */}
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Useful Resources</p>
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center cursor-pointer hover:bg-slate-50 hover:shadow-md transition-all shadow-sm group">
                                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Privacy Policy</span>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-400 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-12 md:mt-20 pb-8 text-center text-[11px] text-slate-400 font-medium tracking-wide">
                    <p>© 2024 University AI Initiative. All systems operational using Groq LPU™ technology.</p>
                </footer>
            </div>
        </div>
    );
};

export default TransparencyPage;
