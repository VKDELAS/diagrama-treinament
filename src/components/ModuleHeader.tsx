import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon: LucideIcon;
  badgeColor?: string;
  backLabel?: string;
  onBack: () => void;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  subtitle,
  badge = 'B1 • BANCO DE DADOS',
  icon: Icon,
  badgeColor = 'bg-blue-900/60 border-blue-700/60 text-blue-300',
  backLabel = 'Voltar',
  onBack,
}) => {
  return (
    <header className="w-full min-h-[56px] bg-slate-900/95 border-b border-slate-800 px-3 sm:px-6 py-2.5 flex items-center justify-between z-40 select-none backdrop-blur-md shrink-0 gap-3">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Botão de retorno padronizado */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm touch-manipulation"
          title="Voltar"
        >
          <ArrowLeft size={16} className="text-blue-400" />
          <span>{backLabel}</span>
        </button>

        <div className="h-5 w-px bg-slate-800 hidden xs:block" />

        <div className="flex items-center gap-2.5">
          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-800 border border-slate-700 text-blue-400 shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-wide">
                {title}
              </h1>
              {badge && (
                <span
                  className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border hidden sm:inline ${badgeColor}`}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[11px] text-slate-400 hidden md:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
