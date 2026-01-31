import { Clock, FileText, MoreHorizontal, Plus, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const recentNotes = [
    { id: 1, title: 'Project Phoenix Roadmap', preview: 'Key milestones for Q3 include...', date: '2h ago', tag: 'Work' },
    { id: 2, title: 'Meeting Notes: Design Sync', preview: 'Action items: Update color palette...', date: '5h ago', tag: 'Design' },
    { id: 3, title: 'Grocery List', preview: 'Milk, Eggs, Bread, Coffee...', date: '1d ago', tag: 'Personal' },
    { id: 4, title: 'Book Ideas: Sci-Fi', preview: 'Concept: A world where gravity...', date: '2d ago', tag: 'Ideas' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 slide-in-from-bottom-4">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Good morning, <span className="text-[#2A9D8F]">John</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Ready to capture some ideas today?
          </p>
        </div>
        
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium">
             <Sparkles className="w-4 h-4 text-[#E9C46A]" />
             <span>Daily Review</span>
           </button>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2A9D8F]/20 to-[#2A9D8F]/5 border border-[#2A9D8F]/20 hover:border-[#2A9D8F]/40 transition-all group cursor-pointer backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-[#2A9D8F]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-[#2A9D8F]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Quick Note</h3>
          <p className="text-slate-400 text-sm">Create a new note instantly in your default folder.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-[#F4A261]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-[#F4A261]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">AI Brainstorm</h3>
          <p className="text-slate-400 text-sm">Generate ideas with the help of AI assistance.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-[#E76F51]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5 text-[#E76F51]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Recent Activity</h3>
          <p className="text-slate-400 text-sm">View what you worked on yesterday.</p>
        </div>
      </section>

      {/* Recent Notes Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Notes</h2>
          <button className="text-sm text-[#2A9D8F] hover:text-[#2A9D8F]/80 font-medium">View all</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentNotes.map((note) => (
            <div 
              key={note.id}
              className="group relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#2A9D8F]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-48"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]" />
                  {note.tag}
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-lg transition-all text-slate-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-[#2A9D8F] transition-colors">
                {note.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-3 mb-auto leading-relaxed">
                {note.preview}
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 border-t border-white/5 pt-3">
                <Clock className="w-3 h-3" />
                <span>Edited {note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
