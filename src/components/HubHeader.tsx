import React from 'react';
import { Search, X, Compass } from 'lucide-react';

interface HubHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCount: number;
  totalCount: number;
}

export const HubHeader: React.FC<HubHeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeCount,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#080b11]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Lado Esquerdo: Identidade Visual Minimalista */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative group cursor-pointer flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-[1px] shadow-sm shadow-blue-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
                <Compass size={17} className="text-blue-400 transition-transform group-hover:rotate-45" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white">
                NEXUS
              </span>
              <span className="text-zinc-600 text-xs font-mono">/</span>
              <span className="text-xs text-zinc-400 font-medium tracking-tight hidden xs:inline">
                Portal de Estudos
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
              ADS • 2026.1
            </span>
          </div>
        </div>

        {/* Centro: Barra de Busca Minimalista */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
          <div className="relative flex items-center w-full">
            <Search
              size={14}
              className="absolute left-3 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar matéria, código ou tópico..."
              className="w-full h-8 pl-8 pr-12 text-xs bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/[0.08] focus:border-blue-500/50 rounded-full text-zinc-200 placeholder:text-zinc-500 outline-none transition-all duration-150"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                title="Limpar busca"
              >
                <X size={13} />
              </button>
            ) : (
              <span className="absolute right-3 hidden sm:flex items-center gap-0.5 text-[9px] font-mono text-zinc-500 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06] pointer-events-none">
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Lado Direito: Status com Indicador Pulsante */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-zinc-300">
              {activeCount} {activeCount === 1 ? 'Matéria Pronta' : 'Matérias Prontas'}
            </span>
            <span className="text-zinc-600 text-[10px] hidden xs:inline">•</span>
            <span className="text-[11px] text-zinc-400 hidden xs:inline">
              {totalCount} Total
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
