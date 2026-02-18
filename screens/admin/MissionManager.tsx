
import React, { useState } from 'react';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import { MISSIONS } from '../../constants';
import { GoogleGenAI } from "@google/genai";
import { Mission, MissionType } from '../../types';

const MissionManager: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>(MISSIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleCreateAI = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie uma missão pedagógica gamificada inovadora sobre o tema: "${prompt}". 
        Retorne estritamente um JSON no seguinte formato: 
        { "title": "string", "objective": "string", "reward": number, "type": "quiz" | "upload" | "interactive", "activityUrl": "string" }.
        Se o tipo for 'interactive', a activityUrl deve ser um link para uma atividade online sugerida.`,
      });
      
      const text = response.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        const newMission: Mission = {
          id: Math.random().toString(36).substr(2, 9),
          title: data.title,
          objective: data.objective,
          reward: data.reward || 150,
          rewardType: 'xp',
          progress: 0,
          maxProgress: 1,
          completed: false,
          type: data.type || 'upload',
          content: { activityUrl: data.activityUrl || "" }
        };
        setMissions([newMission, ...missions]);
        setIsAIModalOpen(false);
        setPrompt("");
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao gerar missão com IA. Verifique se o tema é válido.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMission = (id: string) => {
    if(confirm("Tem certeza que deseja excluir esta missão permanentemente?")) {
      setMissions(missions.filter(m => m.id !== id));
    }
  };

  const handleEdit = (missionId: string) => {
    alert(`Editor de Missão: Carregando configurações da missão ${missionId}...`);
  };

  const handleDetails = (missionId: string) => {
    alert(`Painel de Dados: Esta missão possui 85% de taxa de aprovação dos alunos.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Painel de Missões</h2>
        <div className="flex gap-2">
           <button onClick={() => setIsAIModalOpen(true)} className="px-4 py-2 bg-cyan-600 rounded-xl font-bold text-xs hover:bg-cyan-500 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-cyan-900/20">
             <span>✨</span>
             <span>Gerar com IA</span>
           </button>
           <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-violet-600 rounded-xl font-bold text-xs hover:bg-violet-500 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-violet-900/20">
             <span>+</span>
             <span>Nova Manual</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map(mission => (
          <Card 
            key={mission.id} 
            showActions={true} 
            onEdit={() => handleEdit(mission.id)}
            onDetails={() => handleDetails(mission.id)}
            className="flex flex-col group border-white/5"
          >
            <div className="flex items-start gap-4 mb-2">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {mission.type === 'quiz' ? '📝' : mission.type === 'interactive' ? '🌐' : '🎯'}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold truncate">{mission.title}</h3>
                  <span className="text-[8px] bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded uppercase font-black text-cyan-400">
                    {mission.type || 'upload'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{mission.objective}</p>
                {mission.content?.activityUrl && (
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-[9px] text-emerald-400 font-bold">Link:</span>
                    <span className="text-[9px] text-slate-500 truncate italic underline">{mission.content.activityUrl}</span>
                  </div>
                )}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteMission(mission.id); }}
                className="p-2 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-lg transition-colors"
                title="Excluir"
              >
                🗑️
              </button>
            </div>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="text-[10px] font-black text-violet-400">+{mission.reward} XP</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Ativa no App</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Manual Creation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Nova Missão Manual">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Título da Atividade</label>
            <input type="text" placeholder="Ex: Laboratório Virtual de Química" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Formato Pedagógico</label>
            <select className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500/50 transition-all">
              <option value="upload">Envio de Evidência (Mídia)</option>
              <option value="quiz">Quiz Dinâmico (Múltipla Escolha)</option>
              <option value="interactive">Atividade Interativa Externa (URL)</option>
              <option value="code">Sandbox de Programação</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">URL da Atividade Online</label>
            <input type="url" placeholder="https://plataforma.ceitec.edu/atv/99" className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500/50 transition-all" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Instruções para o Aluno</label>
            <textarea rows={3} placeholder="Explique passo a passo o que deve ser feito para ganhar a recompensa..." className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Recompensa Base (XP)</label>
              <input type="number" defaultValue={200} className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500/50" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Bônus de Moedas</label>
              <input type="number" defaultValue={50} className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-violet-500/50" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-2xl font-bold active:scale-95">Descartar</button>
          <button onClick={() => { setIsModalOpen(false); alert("Missão publicada para todos os alunos!"); }} className="flex-1 py-4 bg-violet-600 hover:bg-violet-500 transition-all rounded-2xl font-bold shadow-xl shadow-violet-600/20 active:scale-95">Publicar Missão</button>
        </div>
      </Modal>

      {/* AI Creation Modal */}
      <Modal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} title="Assistente de Criação ITA ✨">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">Descreva o tópico e nossa IA gerará uma missão estruturada para sua turma.</p>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Sobre o que será o desafio?</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4} 
              placeholder="Ex: Introdução ao Scratch, Circuitos em Série, Redação sobre IA..." 
              className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500/50 transition-all" 
            />
          </div>
          {loading && (
            <div className="flex flex-col items-center py-6 animate-pulse">
              <span className="text-4xl mb-2">🧠</span>
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Sincronizando com a Matriz Curricular...</p>
            </div>
          )}
        </div>
        <div className="mt-8 flex gap-3">
          <button onClick={() => setIsAIModalOpen(false)} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 transition-colors rounded-2xl font-bold active:scale-95">Voltar</button>
          <button 
            disabled={loading || !prompt}
            onClick={handleCreateAI} 
            className="flex-1 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all rounded-2xl font-bold shadow-xl shadow-cyan-600/20 disabled:opacity-50 active:scale-95"
          >
            Gerar Atividade Inteligente
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MissionManager;
