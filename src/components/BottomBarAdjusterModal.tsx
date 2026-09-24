import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Check,
  X,
  Sliders,
  Sparkles,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import {
  type BottomNavMode,
  DEFAULT_PADDING_3_BUTTONS,
  DEFAULT_PADDING_GESTURES,
  getSavedBottomNavSettings,
  saveBottomNavSettings,
  detectDeviceBottomBar,
} from '../utils/bottomNavDetector';

interface BottomBarAdjusterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomBarAdjusterModal: React.FC<BottomBarAdjusterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mode, setMode] = useState<BottomNavMode>('auto');
  const [currentPadding, setCurrentPadding] = useState<number>(
    DEFAULT_PADDING_3_BUTTONS
  );
  const [detectedType, setDetectedType] = useState<string>('3buttons');

  useEffect(() => {
    if (isOpen) {
      const settings = getSavedBottomNavSettings();
      setMode(settings.mode);
      setCurrentPadding(settings.customPadding);
      setDetectedType(settings.detectedType);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectMode = (newMode: BottomNavMode) => {
    setMode(newMode);
    let targetPadding = currentPadding;
    if (newMode === '3buttons') {
      targetPadding = DEFAULT_PADDING_3_BUTTONS;
    } else if (newMode === 'gestures') {
      targetPadding = DEFAULT_PADDING_GESTURES;
    } else if (newMode === 'auto') {
      const detected = detectDeviceBottomBar();
      targetPadding = detected.suggestedPadding;
    }
    setCurrentPadding(targetPadding);
    saveBottomNavSettings(newMode, targetPadding);
  };

  const handlePaddingChange = (newVal: number) => {
    const clamped = Math.max(0, Math.min(120, newVal));
    setCurrentPadding(clamped);
    setMode('custom');
    saveBottomNavSettings('custom', clamped);
  };

  const handleAutoDetectAgain = () => {
    const detected = detectDeviceBottomBar();
    setDetectedType(detected.type);
    handleSelectMode('auto');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in touch-manipulation select-none"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#0b101b] border-t sm:border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col gap-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal com fechar */}
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
              <Smartphone size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Ajuste de Botões do Celular
              </h3>
              <p className="text-[11px] text-zinc-400">
                Evita que os 3 botões (◀ ⌂ ▢) tampem o site
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Status de Detecção Atual */}
        <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <ShieldCheck size={16} className="text-cyan-400 shrink-0" />
            <span>
              Detectado:{' '}
              <strong className="text-white">
                {detectedType === '3buttons'
                  ? 'Celular com 3 Botões ◀ ⌂ ▢'
                  : detectedType === 'gestures'
                  ? 'Navegação por Gestos'
                  : 'Desktop / Computador'}
              </strong>
            </span>
          </div>
          <button
            onClick={handleAutoDetectAgain}
            className="text-[11px] text-cyan-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
            title="Recalcular detecção"
          >
            <RotateCcw size={12} />
            <span>Redetectar</span>
          </button>
        </div>

        {/* Opções Pré-definidas */}
        <div className="space-y-2.5">
          {/* Opção 1: Modo 3 Botões */}
          <div
            onClick={() => handleSelectMode('3buttons')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              mode === '3buttons' || (mode === 'auto' && detectedType === '3buttons')
                ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950/40 text-white'
                : 'bg-white/[0.02] border-white/[0.08] hover:border-cyan-500/40 text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono text-xs text-cyan-400 shrink-0">
                ◀ ⌂ ▢
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold block truncate">
                    Modo 3 Botões (Recomendado)
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 font-mono">
                    +76px
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                  Espaço extra seguro para os botões do Android nunca cobrirem nada.
                </p>
              </div>
            </div>
            {(mode === '3buttons' || (mode === 'auto' && detectedType === '3buttons')) && (
              <Check size={16} className="text-cyan-400 shrink-0" />
            )}
          </div>

          {/* Opção 2: Modo Gestos */}
          <div
            onClick={() => handleSelectMode('gestures')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              mode === 'gestures' || (mode === 'auto' && detectedType === 'gestures')
                ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-950/40 text-white'
                : 'bg-white/[0.02] border-white/[0.08] hover:border-cyan-500/40 text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs text-blue-400 shrink-0">
                —
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold block truncate">
                    Modo Gestos / Tela Cheia
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 font-mono">
                    +24px
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                  Para quem usa deslizar os dedos sem botões fixos na base.
                </p>
              </div>
            </div>
            {(mode === 'gestures' || (mode === 'auto' && detectedType === 'gestures')) && (
              <Check size={16} className="text-cyan-400 shrink-0" />
            )}
          </div>
        </div>

        {/* Ajuste Fino Manual */}
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-300 flex items-center gap-1.5 font-medium">
              <Sliders size={13} className="text-cyan-400" />
              Ajuste Fino Manual:
            </span>
            <span className="font-mono text-cyan-300 font-bold">
              {currentPadding}px
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePaddingChange(currentPadding - 8)}
              className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 text-white font-mono font-bold text-sm flex items-center justify-center transition-all cursor-pointer"
            >
              -
            </button>
            <input
              type="range"
              min="0"
              max="110"
              step="4"
              value={currentPadding}
              onChange={(e) => handlePaddingChange(parseInt(e.target.value, 10))}
              className="flex-1 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <button
              onClick={() => handlePaddingChange(currentPadding + 8)}
              className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 text-white font-mono font-bold text-sm flex items-center justify-center transition-all cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Botão de Concluir */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 active:scale-98 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
        >
          <Sparkles size={15} />
          <span>Salvar e Aplicar no Celular</span>
        </button>
      </div>
    </div>
  );
};
