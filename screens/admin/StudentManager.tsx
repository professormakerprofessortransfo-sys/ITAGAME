
import React from 'react';
import Card from '../../components/Card';
import { MOCK_STUDENTS } from '../../constants';

const StudentManager: React.FC = () => {
  const handleDelete = (name: string) => {
    if(confirm(`Tem certeza que deseja remover o aluno ${name}?`)) {
      alert(`Aluno ${name} removido com sucesso.`);
    }
  };

  const handleEdit = (name: string) => {
    alert(`Editando perfil de ${name}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nome, turma ou nível..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-white/5 rounded-2xl text-sm focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => alert('Exportando base de alunos...')} className="flex-1 md:flex-none px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 border border-white/5">Exportar CSV</button>
          <button onClick={() => alert('Abrindo formulário de cadastro')} className="flex-1 md:flex-none px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-violet-900/20">Novo Aluno</button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-white/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-900/80 border-b border-white/5">
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="px-6 py-5">Estudante</th>
                <th className="px-6 py-5">Turma</th>
                <th className="px-6 py-5">Nível / XP</th>
                <th className="px-6 py-5">Economia</th>
                <th className="px-6 py-5">Progresso</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_STUDENTS.map(student => (
                <tr key={student.id} className="hover:bg-white/[0.02] transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{student.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-slate-400 bg-white/5 px-2 py-1 rounded-md uppercase tracking-wider">{student.class}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-cyan-400 tracking-tight">Level {student.level}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{student.xp.toLocaleString()} XP</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-amber-500">💰 {student.coins.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="w-32">
                        <div className="flex justify-between text-[8px] font-black uppercase mb-1.5 text-slate-500">
                          <span>{student.missionsCompleted} missões</span>
                          <span className="text-white">{(student.missionsCompleted / 80 * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500" style={{ width: `${student.missionsCompleted / 80 * 100}%` }} />
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{student.lastActive}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => alert(`Visualizando histórico de ${student.name}`)} className="p-2.5 hover:bg-violet-600/20 text-slate-500 hover:text-violet-400 rounded-xl transition-all" title="Ver Perfil">
                        <span>👁️</span>
                      </button>
                      <button onClick={() => handleEdit(student.name)} className="p-2.5 hover:bg-cyan-600/20 text-slate-500 hover:text-cyan-400 rounded-xl transition-all" title="Editar">
                        <span>✏️</span>
                      </button>
                      <button onClick={() => handleDelete(student.name)} className="p-2.5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-500 rounded-xl transition-all" title="Excluir">
                        <span>🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentManager;
