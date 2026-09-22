import React from 'react';
import { useDiagramStore } from '../store/useDiagramStore';
import {
  Brain,
  X,
  Lightbulb,
  Laugh,
  ArrowRight,
} from 'lucide-react';

interface HumorousClueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HumorousClueModal: React.FC<HumorousClueModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentExercise } = useDiagramStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-500/60 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col text-slate-100 animate-in zoom-in-95 duration-200">
        {/* Cabeçalho da Zoeira */}
        <div className="p-5 bg-gradient-to-r from-amber-950/90 via-slate-900 to-rose-950/90 border-b border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 border border-amber-400 text-amber-400 rounded-2xl animate-bounce">
              <Brain size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white font-mono tracking-wider">
                  Modo Arrego Ativado
                </span>
                <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                  <Laugh size={13} /> ADS 2º Semestre
                </span>
              </div>
              <h2 className="text-base font-black text-white tracking-wide mt-0.5">
                IH RAPAZ... JÁ PEDIU COLINHA?! 😂
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo com a zoeira e as pistas reais */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Mensagem zoeira */}
          <div className="p-3.5 bg-slate-950/80 border border-amber-500/30 rounded-2xl text-xs sm:text-sm text-amber-200 leading-relaxed space-y-2">
            <p>
              Tava difícil né consagrado(a)? Cadê os neurônios do 2º semestre de
              ADS?! O professor de Engenharia de Software tá chorando no banho
              vendo você abrir essa colinha! 💀
            </p>
            <p className="text-slate-300 font-medium">
              Mas relaxa, o pai salva antes que seu cérebro dê{' '}
              <code className="text-rose-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono font-bold">
                NullPointerException
              </code>
              . Dá uma olhada nas peças que você tem que colocar:
            </p>
          </div>

          {/* Gabarito das Peças */}
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5 flex items-center gap-1.5">
                👤 Atores que você deve criar:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentExercise.gabarito.nodes
                  .filter((n) => n.tipo === 'ator')
                  .map((ator) => (
                    <span
                      key={ator.id}
                      className="px-2.5 py-1 bg-blue-950/80 border border-blue-500/50 text-blue-200 rounded-lg text-xs font-bold"
                    >
                      {ator.label}
                    </span>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5">
                ⭕ Casos de Uso que você deve criar:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentExercise.gabarito.nodes
                  .filter((n) => n.tipo === 'casoDeUso')
                  .map((caso) => (
                    <span
                      key={caso.id}
                      className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 rounded-lg text-xs font-bold"
                    >
                      {caso.label}
                    </span>
                  ))}
              </div>
            </div>

            {/* Dica da Regra das Relações */}
            <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Lightbulb size={13} /> Dica de ouro pra não errar a seta:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentExercise.regra}
              </p>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 flex flex-col gap-1">
                <span>
                  • <strong>&lt;&lt;include&gt;&gt;</strong>: A seta SAI de quem obriga e APONTA para o obrigatório.
                </span>
                <span>
                  • <strong>&lt;&lt;extend&gt;&gt;</strong>: A seta SAI da opção/condição e APONTA para o caso base que ela estende.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 italic">
            Não conta pro professor que você olhou aqui 🤫
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Valeu, sou meio lerdo(a) mas vou montar!</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
