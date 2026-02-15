import React from 'react';
import { 
  ShieldCheck, Database, Zap, BookOpen, 
  Users, CheckCircle2, XCircle, RefreshCcw,
  ChevronRight 
} from 'lucide-react';

const BotTransparencyGuide = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-700">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#001E3C] mb-2">Bot Transparency & Guide</h1>
          <p className="text-slate-500 max-w-2xl">
            See exactly what the AI knows, where it learns from, and how to get the best answers for your studies.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Knowledge Map & How-To */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Knowledge Map Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-teal-600" />
                  <h2 className="font-bold text-slate-800">Knowledge Map</h2>
                </div>
                <span className="bg-teal-50 text-teal-600 text-[10px] font-bold px-2 py-1 rounded-md">3 Verified Sources</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <SourceCard 
                  title="2026 Academic Handbook"
                  desc="Official policies, grading scales, and degree requirements directly from the Registrar."
                  sync="2 days ago"
                />
                <SourceCard 
                  title="Campus Safety Protocols"
                  desc="Emergency procedures, safe walk routes, and contact numbers sourced from Campus Safety."
                  sync="Today, 9:00 AM"
                />
              </div>

              {/* Large Featured Source Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-sm">
                <div className="absolute top-6 right-6 flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] font-bold">
                  <CheckCircle2 size={12} /> Verified
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Course Catalog & Faculty Directory</h3>
                    <p className="text-[10px] text-slate-400">Connected to Department Database</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Comprehensive list of all current courses, prerequisites, and faculty office hours. This data is updated weekly to reflect room changes and availability.
                </p>
                <div className="flex gap-8">
                  <Stat label="COURSES" value="2,450+" />
                  <Stat label="FACULTY" value="380+" />
                </div>
              </div>
            </section>

            {/* How to Ask Section */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={20} className="text-teal-600" />
                <h2 className="font-bold text-slate-800">'How to Ask' Guide</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prompt Library: Finding Faculty</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Don't Ask */}
                  <div className="border-l-4 border-rose-400 bg-rose-50/30 p-5 rounded-r-2xl">
                    <div className="flex items-center gap-2 text-rose-600 text-[10px] font-bold uppercase mb-3">
                      <XCircle size={14} /> Don't Ask
                    </div>
                    <p className="italic font-medium text-slate-800 mb-2">"Tell me about teachers."</p>
                    <p className="text-xs text-slate-500">Too vague. The bot will struggle to know which department or context you need.</p>
                  </div>

                  {/* Do Ask */}
                  <div className="border-l-4 border-emerald-400 bg-emerald-50/30 p-5 rounded-r-2xl">
                    <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-bold uppercase mb-3">
                      <CheckCircle2 size={14} /> Do Ask
                    </div>
                    <p className="italic font-medium text-slate-800 mb-2">"Who are the CS faculty specializing in AI?"</p>
                    <p className="text-xs text-slate-500">Specific and targeted. Uses keywords like 'CS' and 'AI' found in the vector database.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-medium italic">
                    Tip: Try asking about prerequisites, office hours, or lab safety for more accurate results.
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Status & Resources */}
          <div className="space-y-6">
            {/* Bot Health Widget */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-sm">Bot Health</h3>
                <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Systems Normal
                </span>
              </div>
              
              <div className="space-y-3">
                <StatusRow icon={<Zap size={14}/>} label="Groq Engine" sub="Inference Model" status="Online" color="text-emerald-500" />
                <StatusRow icon={<Database size={14}/>} label="Vector DB" sub="Knowledge Base" status="Synced" color="text-emerald-500" />
                <StatusRow icon={<ShieldCheck size={14}/>} label="Guardrails" sub="Content Filter" status="Active" color="text-emerald-500" />
              </div>
            </div>

            {/* Useful Resources - Modified */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Useful Resources</p>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                <span className="text-sm font-semibold text-slate-700">Privacy Policy</span>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-[11px] text-slate-400">
          <p>© 2024 University AI Initiative. All systems operational.</p>
        </footer>
      </div>
    </div>
  );
};

// Helper Components
const SourceCard = ({ title, desc, sync }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-3xl relative shadow-sm">
    <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[9px] font-bold">
      <ShieldCheck size={10} /> Verified
    </div>
    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4">
      <BookOpen size={20} />
    </div>
    <h3 className="font-bold text-slate-800 text-sm mb-2">{title}</h3>
    <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">{desc}</p>
    <div className="flex items-center gap-1 text-[10px] text-slate-400">
      <RefreshCcw size={10} /> Last synced: {sync}
    </div>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-lg font-bold text-teal-600">{value}</p>
  </div>
);

const StatusRow = ({ icon, label, sub, status, color }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-teal-600">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-800">{label}</p>
        <p className="text-[9px] text-slate-400">{sub}</p>
      </div>
    </div>
    <div className={`text-[10px] font-bold ${color} flex items-center gap-1`}>
      {status} <CheckCircle2 size={12} />
    </div>
  </div>
);

export default BotTransparencyGuide;