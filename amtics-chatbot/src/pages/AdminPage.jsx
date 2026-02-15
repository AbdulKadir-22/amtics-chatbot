import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, Cloud, Bell } from 'lucide-react';
import StatCard from '../components/admin/StatCard';
import UploadPanel from '../components/admin/UploadPanel';
import DocumentTable from '../components/admin/DocumentTable';
import Badge from '../components/common/Badge';
import api from '../api/api';

const AdminPage = () => {
    const [documents, setDocuments] = useState([]);
    const [stats, setStats] = useState({
        totalDocuments: 0,
        lastUpdate: 'Never',
        storageUsed: '0 GB',
        quotaUsed: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, sourcesRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/guide/sources')
            ]);

            if (sourcesRes.success && Array.isArray(sourcesRes.sources)) {
                const formattedDocs = sourcesRes.sources.map((s, idx) => ({
                    id: idx,
                    name: s.name || 'Unnamed Source',
                    tag: s.name?.endsWith('.pdf') ? 'PDF' : 'CSV',
                    tagColor: s.name?.endsWith('.pdf') ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500',
                    date: s.lastUpdated ? new Date(s.lastUpdated).toLocaleDateString() : 'Recently'
                }));
                setDocuments(formattedDocs);
            }

            if (statsRes.success && statsRes.data) {
                const s = statsRes.data;
                setStats({
                    totalDocuments: s.totalDocuments || 0,
                    lastUpdate: s.lastUpdate ? new Date(s.lastUpdate).toLocaleTimeString() : 'Never',
                    storageUsed: s.storageUsed || '0 GB',
                    quotaUsed: s.quotaUsed || 0
                });
            }
        } catch (error) {
            console.error('Admin Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const data = await api.post('/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (data.success) {
                alert('File uploaded and indexed successfully!');
                fetchData();
            } else {
                alert('Upload failed: ' + data.message);
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Error connecting to server during upload.');
        }
    };

    const statCards = [
        { label: 'Total Documents', value: stats.totalDocuments.toLocaleString(), subValue: '+1 recently', trend: 'up', icon: FileText, progress: 100 },
        { label: 'Last Index Update', value: stats.lastUpdate, subValue: 'Auto-sync enabled', icon: RefreshCw, progress: 100 },
        { label: 'Storage Used', value: stats.storageUsed, trend: 'up', subValue: `${stats.quotaUsed}% of 10 GB Quota`, progress: stats.quotaUsed, icon: Cloud },
    ];

    return (
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Knowledge Management</h1>
                <div className="flex items-center gap-4">
                    <Badge color="emerald" className="animate-pulse shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="uppercase tracking-wider text-xs">Groq API: Active</span>
                    </Badge>
                </div>
            </header>

            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statCards.map((stat, idx) => (
                        <StatCard
                            key={idx}
                            label={stat.label}
                            value={stat.value}
                            trend={stat.trend}
                            subValue={stat.subValue}
                            progress={stat.progress}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                {/* Upload Section */}
                <UploadPanel onUpload={handleUpload} />

                {/* Document Library Table */}
                <div className="overflow-x-auto">
                    <DocumentTable documents={documents} />
                </div>
            </div>
        </main>
    );
};

export default AdminPage;
