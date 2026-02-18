
import React from 'react';
import Card from '../../components/Card';
import { MOCK_SUBMISSIONS } from '../../constants';

const ValidationPortal: React.FC = () => {
  const handleApprove = (id: string, name: string) => {
    alert(`Submissão ${id} de ${name} APROVADA! Recompensas creditadas.`);
  };

  const handleReject = (id: string, name: string) => {
    const reason = prompt("Por que deseja recusar? (Opcional)");
    alert(`Submissão de ${name} RECUSADA. Feedback enviado.`);
  };

  const handleChat = (name: string) => {
    alert(`Abrindo chat privado com ${name}...`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="text-4xl animate-bounce">🚀</div>
          <div>
            <h3 className="text-lg font-bold text-amber-400 tracking-tight">Fila de Validação Pendente</h3>
            <p className="text-sm text-amber-200/60 font-medium">Você tem submissões aguardando análise para liberação de recompensas.</p>
          </div>
        </div>
        <button 
          onClick={() => alert('Todas as submissões visíveis foram aprovadas!')}
          className="w-full md:w-auto px-8 py-3 bg-amber-500 text-slate-950 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/30 uppercase text-xs tracking-widest"
        >
          Validar Todas
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {MOCK_SUBMISSIONS.map(sub => (
          <Card key={sub.id} className="p-6 flex flex-col sm:flex-row gap-6 group hover:border-cyan-500/30 transition-all shadow-lg">
            <div className="w-full sm:w-32 h-32 bg-slate-800 rounded-3xl shrink-0 flex items-center justify-center text-5xl border border-white/5 group-hover:bg-slate-700 transition-colors shadow-inner">
              {sub.evidenceType === 'image' ? '🖼️' : sub.evidenceType === 'video' ? '🎥' : '📝'}
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-md border border-cyan-400/10">
                    {sub.evidenceType}
                  </span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{sub.timestamp}</span>
                </div>
                <h3 className="text-xl font-bold mb-1 tracking-tight group-hover:text-cyan-400 transition-colors">{sub.missionTitle}</h3>
                <p className="text-xs text-slate-400 font-medium">Enviado por <span className="text-white font-bold">{sub.studentName}</span></p>
              </div>

              <div className="flex gap-2 mt-6">
                <button 
                  onClick={() => handleApprove(sub.id, sub.studentName)}
                  className="flex-1 py-3 bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
                >
                  Aprovar
                </button>
                <button 
                  onClick={() => handleReject(sub.id, sub.studentName)}
                  className="flex-1 py-3 bg-rose-600/20 text-rose-400 border border-rose-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-95"
                >
                  Recusar
                </button>
                <button 
                  onClick={() => handleChat(sub.studentName)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-all active:scale-95"
                >
                  💬
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ValidationPortal;
