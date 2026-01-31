import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Layout, 
  FileText, 
  Search, 
  Settings, 
  Menu, 
  Plus, 
  Star, 
  Trash2, 
  Folder,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export function AppShell() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar - Glassmorphism */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-950/40 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-[0_0_32px_0_rgba(0,0,0,0.3)]",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2 py-6 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2A9D8F] to-[#264653] flex items-center justify-center shadow-lg shadow-[#2A9D8F]/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              NoteSync
            </span>
          </div>

          {/* Action Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-[#2A9D8F] hover:bg-[#2A9D8F]/90 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#2A9D8F]/20 active:scale-95 mb-8 group border border-[#2A9D8F]/50">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Note</span>
          </button>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            <NavItem to="/" icon={<Layout className="w-4 h-4" />} label="Dashboard" active={location.pathname === '/'} />
            <NavItem to="/search" icon={<Search className="w-4 h-4" />} label="Search" active={location.pathname === '/search'} />
            <NavItem to="/favorites" icon={<Star className="w-4 h-4" />} label="Favorites" active={location.pathname === '/favorites'} />
            
            <div className="pt-8 pb-3 flex items-center justify-between px-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Folders
              </p>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <NavItem to="/folder/personal" icon={<Folder className="w-4 h-4 text-[#F4A261]" />} label="Personal" active={location.pathname.includes('/folder/personal')} />
            <NavItem to="/folder/work" icon={<Folder className="w-4 h-4 text-[#E76F51]" />} label="Work Projects" active={location.pathname.includes('/folder/work')} />
            <NavItem to="/folder/ideas" icon={<Folder className="w-4 h-4 text-[#2A9D8F]" />} label="Ideas" active={location.pathname.includes('/folder/ideas')} />
          </nav>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-white/10 space-y-1 mt-auto">
            <NavItem to="/trash" icon={<Trash2 className="w-4 h-4" />} label="Trash" active={location.pathname === '/trash'} />
            <NavItem to="/settings" icon={<Settings className="w-4 h-4" />} label="Settings" active={location.pathname === '/settings'} />
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F4A261] to-[#E76F51] flex items-center justify-center text-xs font-bold text-white">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-slate-500 truncate">Free Plan</p>
              </div>
              <LogOut className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2A9D8F] to-[#264653] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">NoteSync</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-auto scroll-smooth">
          <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function NavItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <NavLink 
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
        active 
          ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]" 
          : "text-slate-400 hover:text-white hover:bg-white/5"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#2A9D8F] rounded-r-full shadow-[0_0_12px_#2A9D8F]" />
      )}
      <span className={cn("relative z-10 transition-colors", active ? "text-[#2A9D8F]" : "text-slate-400 group-hover:text-white")}>
        {icon}
      </span>
      <span className="relative z-10">{label}</span>
      {active && <ChevronRight className="w-3 h-3 ml-auto text-slate-500 animate-in fade-in slide-in-from-left-2" />}
    </NavLink>
  );
}
