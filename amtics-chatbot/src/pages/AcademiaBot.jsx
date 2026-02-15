import React from 'react';
import { 
  Plus, LayoutGrid, Calendar, Settings, 
  MessageSquare, FileText, Map, Zap, Paperclip 
} from 'lucide-react';

const AcademiaBot = () => {
  return (
    <div className="flex h-screen bg-white font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001E3C] text-slate-300 flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="bg-slate-700 p-1.5 rounded-lg">
            <LayoutGrid size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-white">Academia<span className="font-normal text-slate-400">Bot</span></span>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#2D60FF] hover:bg-blue-600 text-white py-3 rounded-xl transition-colors mb-8 font-medium">
          <Plus size={20} /> New Chat
        </button>

        <nav className="flex-1 space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">Focus Mode</p>
            <div className="space-y-1">
              <NavItem icon={<LayoutGrid size={16}/>} label="Faculty" active />
              <NavItem icon={<Calendar size={16}/>} label="Events" />
              <NavItem icon={<Zap size={16}/>} label="Services" />
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2">Recent Queries</p>
            <p className="text-[10px] text-slate-500 font-semibold mb-2 px-2">Today</p>
            <div className="bg-[#1A365D] text-white p-2.5 rounded-lg text-sm mb-2 cursor-pointer">
              Prof. Smith's Office Hours
            </div>
            <p className="text-sm px-2 text-slate-400 mb-4 cursor-pointer hover:text-white">Cafeteria Menu</p>
            
            <p className="text-[10px] text-slate-500 font-semibold mb-2 px-2">Yesterday</p>
            <div className="space-y-3 px-2 text-sm text-slate-400">
              <p className="cursor-pointer hover:text-white">CS101 Syllabus PDF</p>
              <p className="cursor-pointer hover:text-white">Finals Schedule</p>
              <p className="cursor-pointer hover:text-white">Library Late Fees</p>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200" />
            <div>
              <p className="text-sm font-semibold text-white">Alex Johnson</p>
              <p className="text-[10px] text-slate-500">Computer Science • Year 3</p>
            </div>
          </div>
          <Settings size={16} className="text-slate-500 cursor-pointer" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#F8FAFC] overflow-hidden">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex justify-center">
            <span className="bg-slate-200 text-slate-500 text-[10px] px-3 py-1 rounded-full font-bold">Today, 10:23 AM</span>
          </div>

          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tr-none shadow-sm max-w-xl text-sm leading-relaxed">
              Hi! I'm trying to find Professor Alan Smith. Can you tell me when his office hours are for this semester?
            </div>
          </div>

          {/* Bot Response 1 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#001E3C] flex items-center justify-center shrink-0">
               <LayoutGrid size={16} className="text-white" />
            </div>
            <div className="space-y-3 max-w-2xl">
              <div className="bg-[#F1F5F9] p-5 rounded-2xl rounded-tl-none text-sm text-slate-700 leading-relaxed">
                <p className="mb-4">Hello Alex! I can certainly help with that.</p>
                <p className="font-bold text-[#001E3C] mb-3">Dr. Alan Smith — Fall 2024 Schedule</p>
                <p className="mb-4 text-slate-500">According to the latest faculty directory, Dr. Smith is available during the following times:</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold">✓</span>
                    <span className="font-bold">Tuesdays:</span> 2:00 PM – 4:00 PM (In Person)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold">✓</span>
                    <span className="font-bold">Thursdays:</span> 10:00 AM – 12:00 PM (Virtual)
                  </li>
                </ul>
                <p className="text-slate-500">He is located in the <span className="font-bold text-slate-700">Science Building, Room 304</span>. Would you like me to send you a calendar invite?</p>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2D60FF] px-3 py-1.5 rounded-full text-xs w-fit cursor-pointer">
                <FileText size={14} />
                <span>Info Source: Faculty_Handbook_2024.pdf</span>
              </div>
            </div>
          </div>

          {/* Bot Response 2 (Profile Card) */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#001E3C] flex items-center justify-center shrink-0">
               <LayoutGrid size={16} className="text-white" />
            </div>
            <div className="bg-[#F1F5F9] p-5 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-2xl">
              Sure thing! I've pulled up Dr. Smith's quick reference card in the context panel for you.
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex gap-2">
              <SuggestionChip label="Current Semester Dates" />
              <SuggestionChip label="Campus Map" />
              <SuggestionChip label="Upcoming Events" />
            </div>
            
            <div className="relative flex items-center">
              <Paperclip className="absolute left-4 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Ask about classes, faculty, or events..." 
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-16 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button className="absolute right-3 bg-[#001E3C] text-white p-2 rounded-xl">
                <Zap size={20} fill="currentColor" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400">
              AI can make mistakes. Please verify important academic deadlines.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-[#1A365D] text-white' : 'hover:bg-[#1A365D] text-slate-400'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const SuggestionChip = ({ label }) => (
  <button className="bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-slate-50 transition-colors">
    {label}
  </button>
);

export default AcademiaBot;