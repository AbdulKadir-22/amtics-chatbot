import React from 'react';
import Card from '../common/Card';

const StatCard = ({ label, value, trend, subValue, icon: Icon, progress }) => {
    return (
        <Card className="flex justify-between items-start">
            <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-bold text-slate-800">{value}</p>

                {trend && <p className="text-[11px] font-bold text-emerald-500">↗ {trend}</p>}
                {subValue && !progress && <p className="text-[11px] text-slate-400 font-medium">{subValue}</p>}

                {progress && (
                    <div className="pt-2">
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-blue-500 h-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{subValue}</p>
                    </div>
                )}
            </div>

            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 shadow-sm">
                {Icon && <Icon size={20} />}
            </div>
        </Card>
    );
};

export default StatCard;
