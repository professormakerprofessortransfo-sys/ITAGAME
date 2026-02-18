
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  showActions?: boolean;
  onEdit?: (e: React.MouseEvent) => void;
  onDetails?: (e: React.MouseEvent) => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hover = true, 
  showActions = false,
  onEdit,
  onDetails 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative bg-slate-900/60 backdrop-blur-lg border border-white/10 rounded-3xl p-5
        ${onClick ? 'cursor-pointer active:scale-95 transition-all' : ''}
        ${hover && onClick ? 'hover:bg-slate-800/80 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10' : ''}
        ${className}
      `}
    >
      {children}
      
      {showActions && (
        <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-white/5">
          <button 
            onClick={(e) => { e.stopPropagation(); onDetails?.(e); }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/5"
          >
            Ver Detalhes
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit?.(e); }}
            className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-violet-900/20"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
