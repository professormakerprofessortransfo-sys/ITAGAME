
import React from 'react';
import { Screen, UserStats } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  stats: UserStats;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, stats, onNavigate, onLogout }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-950 flex flex-col relative font-fredoka">
      {/* Top Persistent Bar */}
      <div className="sticky top-0 z-50 px-6 py-4 flex flex-col gap-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tighter">ITA</span>
            <span className="text-xl font-bold tracking-tighter text-cyan-400">GAME</span>
          </div>
          
          <button 
            onClick={onLogout}
            className="text-[10px] font-bold text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full"
          >
            <span>Sair</span>
            <span>🚪</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              <span className="text-sm">💰</span>
              <span className="text-xs font-bold text-amber-400">{stats.coins}</span>
            </div>
            <div className="flex items-center gap-1 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20">
              <span className="text-sm">⚡</span>
              <span className="text-xs font-bold text-violet-400">{stats.xp}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Lvl {stats.level}</span>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-sm shadow-lg border border-white/10">
              {stats.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-slate-900/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-6 z-50">
        <NavItem 
          active={activeScreen === Screen.DASHBOARD} 
          onClick={() => onNavigate(Screen.DASHBOARD)} 
          icon="🏠" 
          label="Início" 
        />
        <NavItem 
          active={activeScreen === Screen.DISCIPLINES} 
          onClick={() => onNavigate(Screen.DISCIPLINES)} 
          icon="🗺️" 
          label="Trilhas" 
        />
        <NavItem 
          active={activeScreen === Screen.SHOP} 
          onClick={() => onNavigate(Screen.SHOP)} 
          icon="🛍️" 
          label="Loja" 
        />
        <NavItem 
          active={activeScreen === Screen.RANKING} 
          onClick={() => onNavigate(Screen.RANKING)} 
          icon="🏆" 
          label="Ranking" 
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-cyan-400 scale-110' : 'text-slate-500 opacity-60'}`}
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    {active && <div className="w-1 h-1 bg-cyan-400 rounded-full mt-0.5 animate-pulse" />}
  </button>
);

export default Layout;
