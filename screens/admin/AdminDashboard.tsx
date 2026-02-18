
import React from 'react';
import Card from '../../components/Card';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Alunos Ativos" value="1.240" trend="+12%" icon="👥" color="cyan" />
        <StatCard label="Missões Concluídas" value="4.821" trend="+5%" icon="🎯" color="violet" />
        <StatCard label="Média de Engajamento" value="84%" trend="+3%" icon="⚡" color="emerald" />
        <StatCard label="Moedas em Circulação" value="154k" trend="-2%" icon="💰" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-bold">Atividades Recentes</h3>
            <button className="text-violet-400 text-[10px] font-black uppercase tracking-widest hover:text-violet-300 transition-colors">Ver Todas</button>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { id: '1', user: 'Ana Luiza', action: 'submeteu uma evidência para', item: 'Lógica Python', time: 'Há 5 min', color: 'bg-cyan-500' },
              { id: '2', user: 'Alexia M.', action: 'conquistou a badge', item: 'Mestre Maker', time: 'Há 12 min', color: 'bg-amber-500' },
              { id: '3', user: 'André Anuzzi', action: 'resgatou item na loja:', item: 'Skin Robô Dourado', time: 'Há 1 hora', color: 'bg-violet-500' },
              { id: '4', user: 'Sandra C.', action: 'subiu para o nível', item: 'Level 10 (Júnior)', time: 'Há 3 horas', color: 'bg-emerald-500' },
            ].map((row) => (
              <div key={row.id} className="p-6 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                <div className={`w-10 h-10 rounded-full ${row.color} flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0`}>
                  {row.user[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm truncate">
                    <span className="font-bold text-white">{row.user}</span> {row.action} <span className="font-bold text-cyan-400">{row.item}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{row.time}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => alert('Visualizando log')} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-xs" title="Detalhes">👁️</button>
                  <button onClick={() => alert('Excluindo entrada do log')} className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-colors text-xs" title="Excluir">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performers */}
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-lg font-bold">Alunos em Destaque</h3>
          </div>
          <div className="p-6 space-y-6">
            {[
              { id: 'p1', name: 'Alexia Mirella', xp: '12.450 XP', level: 15, avatar: '👧' },
              { id: 'p2', name: 'Ana Luiza', xp: '10.996 XP', level: 12, avatar: '👩' },
              { id: 'p3', name: 'André Anuzzi', xp: '8.130 XP', level: 10, avatar: '👦' },
            ].map((p) => (
              <div key={p.id} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl border border-white/5 group-hover:border-violet-500/30 transition-colors">
                  {p.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-md font-bold">Lvl {p.level}</span>
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.xp}</span>
                  </div>
                </div>
                <button onClick={() => alert(`Gerenciando perfil de ${p.name}`)} className="p-2 hover:bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all">⚙️</button>
              </div>
            ))}
            <button 
              onClick={() => alert('Redirecionando para lista completa')}
              className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-[10px] transition-colors uppercase tracking-[0.2em] active:scale-95 shadow-lg border border-white/5"
            >
              Ranking Completo
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon, color }: any) => {
  const colorMap: any = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  return (
    <Card 
      onClick={() => alert(`Explorando métricas de ${label}`)}
      className={`p-6 border-none ${colorMap[color]} group hover:-translate-y-1 transition-all shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl group-hover:scale-125 transition-transform">{icon}</span>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-3xl font-black mb-1 group-hover:text-white transition-colors tracking-tighter">{value}</h3>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">{label}</p>
    </Card>
  );
};

export default AdminDashboard;
