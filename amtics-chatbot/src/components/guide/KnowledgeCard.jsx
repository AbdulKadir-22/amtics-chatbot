import React from 'react';
import { BookOpen, RefreshCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';
import Card from '../common/Card';

const KnowledgeCard = ({ source }) => {
    if (source.featured) {
        return (
            <Card className="relative overflow-hidden group">
                {source.verified && (
                    <div className="absolute top-6 right-6">
                        <Badge color="emerald">
                            <CheckCircle2 size={12} /> Verified
                        </Badge>
                    </div>
                )}

                <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">{source.title}</h3>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Connected to Department Database</p>
                    </div>
                </div>

                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    {source.desc}
                </p>

                <div className="flex gap-6">
                    {source.stats.map((stat, idx) => (
                        <div key={idx} className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 flex-1">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-xl font-bold text-teal-600">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <Card className="relative group">
            <div className="absolute top-4 right-4">
                <Badge color="emerald">
                    <ShieldCheck size={10} /> Verified
                </Badge>
            </div>
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <BookOpen size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">{source.title}</h3>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed line-clamp-2">{source.desc}</p>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                <RefreshCcw size={10} className="animate-spin-slow" /> Last synced: {source.sync}
            </div>
        </Card>
    );
};

export default KnowledgeCard;
