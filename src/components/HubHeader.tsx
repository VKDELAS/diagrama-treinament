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
  // Sanitização de segurança de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Remove tags HTML, scripts e limita comprimento a 80 caracteres
    const sanitized = raw.replace(/<[^>]*>?/gm, '').slice(0, 80);
    onSearchChange(sanitized);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#080b11]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto h-14 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Lado Esquerdo: Identidade Visual Minimalista com animação */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative group cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-[1px] shadow-sm shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#080b11] rounded-[7px] flex items-center justify-center">
                <Compass
                  size={16}
                  className="text-blue-400 transition-transform duration-500 group-hover:rotate-45"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white">
                NEXUS
              </span>
              <span className="text-zinc-600 text-xs font-mono hidden xs:inline">
                /
              </span>
              <span className="text-xs text-zinc-400 font-medium tracking-tight hidden sm:inline">
                Portal de Estudos
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center">
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
              ADS • 2026.1
            </span>
          </div>
        </div>

        {/* Centro: Barra de Busca Minimalista e Responsiva */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-4">
          <div className="relative flex items-center w-full">
            <Search
              size={13}
              className="absolute left-2.5 sm:left-3 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Buscar matéria..."
              aria-label="Buscar matéria"
              className="w-full h-8 pl-7 sm:pl-8 pr-8 sm:pr-12 text-xs bg-white/[0.03] hover:bg-white/[0.06] focus:bg-white/[0.08] border border-white/[0.08] focus:border-blue-500/60 rounded-full text-zinc-200 placeholder:text-zinc-500 outline-none transition-all duration-200 touch-manipulation"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 sm:right-3 text-zinc-400 hover:text-white cursor-pointer p-0.5"
                title="Limpar busca"
                aria-label="Limpar busca"
              >
                <X size={13} />
              </button>
            ) : (
              <span className="absolute right-3 hidden sm:flex items-center text-[9px] font-mono text-zinc-500 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06] pointer-events-none">
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Lado Direito: Status com Indicador Pulsante Suave */}
        <div className="flex items-center shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-zinc-300">
              <span className="sm:hidden">{activeCount} Pronta</span>
              <span className="hidden sm:inline">
                {activeCount} {activeCount === 1 ? 'Matéria Pronta' : 'Matérias Prontas'}
              </span>
            </span>
            <span className="text-zinc-600 text-[10px] hidden md:inline">•</span>
            <span className="text-[11px] text-zinc-400 hidden md:inline">
              {totalCount} Total
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
