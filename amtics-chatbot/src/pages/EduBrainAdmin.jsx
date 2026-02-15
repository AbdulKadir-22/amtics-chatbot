import React from 'react';
import { 
  LayoutDashboard, Settings, History, Database, 
  FileText, RefreshCw, Cloud, Upload, Search, 
  Filter, MoreHorizontal, Bell 
} from 'lucide-react';

const EduBrainAdmin = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-600">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-2 mb-4">
          <div className="bg-[#2D60FF] p-1.5 rounded-lg">
            <Database size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800">EduBrain Admin</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarLink icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
        </nav>

        <div className="p-4 border-t border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
            AC
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">Admin Console</p>
            <p className="text-[11px] text-slate-400 truncate">admin@college.edu</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800">Knowledge Management</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-600 uppercase">Groq API: Active</span>
            </div>
            <div className="relative">
              <Bell size={20} className="text-slate-400 cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              label="Total Documents" 
              value="1,248" 
              trend="+12 this week" 
              icon={<FileText className="text-blue-600" size={20}/>}
            />
            <StatCard 
              label="Last Index Update" 
              value="2m ago" 
              subValue="Auto-sync enabled" 
              icon={<RefreshCw className="text-blue-600" size={20}/>}
            />
            <StatCard 
              label="Storage Used" 
              value="4.2 GB" 
              progress={42} 
              subValue="42% of 10 GB Quota" 
              icon={<Cloud className="text-blue-600" size={20}/>}
            />
          </div>

          {/* Upload Section - Now spans full width since Ingestion Settings are removed */}
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <Upload size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Drop & Index Documents</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Drag academic PDFs, DOCX, or text files here to upload. Supports bulk ingestion.
              </p>
            </div>
            <button className="px-6 py-2 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              Browse Files
            </button>
          </div>

          {/* Document Library Table */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Document Library</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search files..." 
                    className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <button className="p-2 bg-slate-50 rounded-xl text-slate-500">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category Tag</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Token Count</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TableRow 
                  name="CS101_Syllabus_Fall2023.pdf" 
                  tag="Course Syllabus" 
                  tagColor="bg-blue-50 text-blue-600"
                  date="Oct 24, 2023"
                  tokens="4,021 tkns"
                  status="Indexed"
                  statusColor="text-emerald-500 bg-emerald-50"
                  iconBg="bg-rose-50 text-rose-500"
                />
                <TableRow 
                  name="Dr_Smith_Bio_2024.docx" 
                  tag="Faculty Bios" 
                  tagColor="bg-purple-50 text-purple-600"
                  date="Oct 25, 2023"
                  tokens="1,285 tkns"
                  status="Indexed"
                  statusColor="text-emerald-500 bg-emerald-50"
                  iconBg="bg-blue-50 text-blue-500"
                />
                <TableRow 
                  name="Event_Calendar_Spring24.pdf" 
                  tag="Campus Events" 
                  tagColor="bg-orange-50 text-orange-600"
                  date="Oct 26, 2023"
                  tokens="--"
                  status="Processing"
                  statusColor="text-orange-500 bg-orange-50"
                  iconBg="bg-rose-50 text-rose-500"
                />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const SidebarLink = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon}
    <span className="text-sm font-bold">{label}</span>
  </div>
);

const StatCard = ({ label, value, trend, subValue, icon, progress }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-3xl flex justify-between items-start shadow-sm">
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      {trend && <p className="text-[11px] font-bold text-emerald-500">↗ {trend}</p>}
      {subValue && !progress && <p className="text-[11px] text-slate-400">{subValue}</p>}
      {progress && (
        <div className="pt-2">
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">{subValue}</p>
        </div>
      )}
    </div>
    <div className="bg-blue-50 p-3 rounded-2xl">{icon}</div>
  </div>
);

const TableRow = ({ name, tag, tagColor, date, tokens, status, statusColor, iconBg }) => (
  <tr className="hover:bg-slate-50/50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          <FileText size={16} />
        </div>
        <span className="text-sm font-semibold text-slate-700">{name}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${tagColor}`}>{tag}</span>
    </td>
    <td className="px-6 py-4 text-sm text-slate-500">{date}</td>
    <td className="px-6 py-4 text-sm text-slate-500">{tokens}</td>
    <td className="px-6 py-4">
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${statusColor}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${statusColor.split(' ')[0].replace('text', 'bg')}`} />
        {status}
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="text-slate-300 hover:text-slate-600">
        <MoreHorizontal size={20} />
      </button>
    </td>
  </tr>
);

export default EduBrainAdmin;