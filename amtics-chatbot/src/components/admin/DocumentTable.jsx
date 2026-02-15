import React from 'react';
import { FileText, MoreHorizontal, Search, Filter } from 'lucide-react';
import Badge from '../common/Badge';
import Card from '../common/Card';

const DocumentTable = ({ documents }) => {
    return (
        <Card padding="p-0">
            <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center">
                <h3 className="font-bold text-slate-800">Document Library</h3>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search files..."
                            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm w-full sm:w-64 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        />
                    </div>
                    <button className="p-2 bg-slate-50 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">File Name</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category Tag</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upload Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {Array.isArray(documents) && documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${doc.tagColor?.split(' ')[0] || 'bg-slate-100'} text-opacity-80`}>
                                            <FileText size={16} />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge color={doc.tagColor?.split(' ')[1]?.replace('text-', '')?.split('-')[0] || 'blue'}>
                                        {doc.tag}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default DocumentTable;
