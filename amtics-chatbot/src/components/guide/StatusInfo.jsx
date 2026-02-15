import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const StatusInfo = ({ icon: Icon, label, sub, status, color }) => {
    return (
        <div className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-teal-600 shadow-sm group-hover:shadow-md transition-shadow">
                    {Icon && <Icon size={16} />}
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">{label}</p>
                    <p className="text-[9px] text-slate-400 font-medium">{sub}</p>
                </div>
            </div>
            <div className={`text-[10px] font-bold ${color} flex items-center gap-1.5`}>
                {status} <CheckCircle2 size={12} />
            </div>
        </div>
    );
};

export default StatusInfo;
