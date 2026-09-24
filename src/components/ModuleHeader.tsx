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
    <header className="sticky top-0 w-full min-h-[54px] pt-safe bg-[#080b11]/90 border-b border-white/[0.07] px-3 sm:px-6 py-2 flex items-center justify-between z-40 select-none backdrop-blur-xl shrink-0 gap-2 sm:gap-3">
      <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
        {/* Botão de retorno padronizado e minimalista */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 text-zinc-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-all cursor-pointer shadow-sm touch-manipulation shrink-0"
          title="Voltar"
        >
          <ArrowLeft size={15} className="text-cyan-400" />
          <span className="hidden xs:inline">{backLabel}</span>
        </button>

        <div className="h-4 w-px bg-white/10 hidden xs:block shrink-0" />

        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 shrink-0 hidden xxs:flex">
            <Icon size={16} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate max-w-[170px] xxs:max-w-[210px] xs:max-w-[280px] sm:max-w-none">
                {title}
              </h1>
              {badge && (
                <span
                  className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border hidden sm:inline shrink-0 ${badgeColor}`}
                >
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate max-w-[260px] xs:max-w-[340px] md:max-w-none">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
