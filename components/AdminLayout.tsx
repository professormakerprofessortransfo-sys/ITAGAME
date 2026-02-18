
import React, { useState } from 'react';
import { AdminScreen } from '../types';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeScreen: AdminScreen;
  onNavigate: (screen: AdminScreen) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeScreen, onNavigate, onLogout }) => {
  const [showMissionDropdown, setShowMissionDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-outfit">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-black text-white tracking-tighter">ITA</span>
            <span className="text-2xl font-black text-cyan-400 tracking-tighter">GAME</span>
          </div>
          <div className="px-2 py-0.5 bg-cyan-500/10 rounded-md inline-block">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Admin Console</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <SidebarItem 
            active={activeScreen === AdminScreen.OVERVIEW} 
            onClick={() => onNavigate(AdminScreen.OVERVIEW)} 
            icon="📊" 
            label="Dashboard" 
          />
          <SidebarItem 
            active={activeScreen === AdminScreen.STUDENTS} 
            onClick={() => onNavigate(AdminScreen.STUDENTS)} 
            icon="🎓" 
            label="Gestão de Alunos" 
          />
          <SidebarItem 
            active={activeScreen === AdminScreen.MISSIONS} 
            onClick={() => onNavigate(AdminScreen.MISSIONS)} 
            icon="🎯" 
            label="Criador de Missões" 
          />
          <SidebarItem 
            active={activeScreen === AdminScreen.VALIDATION} 
            onClick={() => onNavigate(AdminScreen.VALIDATION)} 
            icon="✅" 
            label="Validação" 
            badge={3}
          />
          <SidebarItem 
            active={activeScreen === AdminScreen.ECONOMY} 
            onClick={() => onNavigate(AdminScreen.ECONOMY)} 
            icon="💰" 
            label="Loja & Economia" 
          />
          <SidebarItem 
            active={activeScreen === AdminScreen.SETTINGS} 
            onClick={() => onNavigate(AdminScreen.SETTINGS)} 
            icon="⚙️" 
            label="Configurações" 
          />
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-xl">👨‍🏫</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Prof. Ricardo</p>
              <p className="text-[10px] text-slate-500 truncate">CEITEC Coordenador</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full py-3 flex items-center justify-center gap-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all font-bold text-sm"
          >
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold capitalize">
            {activeScreen.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4 relative">
             <button className="p-2.5 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors relative">
               <span>🔔</span>
               <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-800"></div>
             </button>
             
             <div className="relative">
                <button 
                  onClick={() => setShowMissionDropdown(!showMissionDropdown)}
                  className="px-4 py-2 bg-violet-600 rounded-xl font-bold text-xs hover:bg-violet-500 transition-colors flex items-center gap-2"
                >
                  <span>+</span>
                  <span>Nova Missão</span>
                  <span className="opacity-50">▾</span>
                </button>
                
                {showMissionDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMissionDropdown(false)} />
                    <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden">
                      <button 
                        onClick={() => { onNavigate(AdminScreen.MISSIONS); setShowMissionDropdown(false); }}
                        className="w-full text-left px-5 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-white/5"
                      >
                        <span className="text-lg">⌨️</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Manual</span>
                          <span className="text-[9px] text-slate-500">Criar do zero</span>
                        </div>
                      </button>
                      <button 
                        onClick={() => { onNavigate(AdminScreen.MISSIONS); setShowMissionDropdown(false); }}
                        className="w-full text-left px-5 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors"
                      >
                        <span className="text-lg">✨</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Com IA</span>
                          <span className="text-[9px] text-slate-500">Gerar desafios</span>
                        </div>
                      </button>
                    </div>
                  </>
                )}
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#020617] custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

interface SidebarItemProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ active, onClick, icon, label, badge }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all group ${active ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'hover:bg-white/5 text-slate-400'}`}
  >
    <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
    <span className="flex-1 text-left font-bold text-sm">{label}</span>
    {badge && (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${active ? 'bg-white text-violet-600' : 'bg-rose-500 text-white'}`}>
        {badge}
      </span>
    )}
  </button>
);

export default AdminLayout;
