import React, { useState } from 'react';
import { X, Plus, BookPlus } from 'lucide-react';
import type { SubjectItem } from '../types/navigation';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubject: (subject: SubjectItem) => void;
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  isOpen,
  onClose,
  onAddSubject,
}) => {
  const [tab, setTab] = useState<'form' | 'code'>('form');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Desenvolvimento');
  const [semester, setSemester] = useState('B1');
  const [description, setDescription] = useState('');
  const [hasFlashcards, setHasFlashcards] = useState(true);
  const [hasResumo, setHasResumo] = useState(true);
  const [hasSimulado, setHasSimulado] = useState(true);
  const [hasDiagramas, setHasDiagramas] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const id = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const newSubject: SubjectItem = {
      id: id || `materia-${Date.now()}`,
      title: title.trim(),
      code: code.trim().toUpperCase() || 'DISC-01',
      semester: semester || 'B1',
      category: category.trim() || 'Geral',
      description:
        description.trim() ||
        'Matéria cadastrada no Portal de Estudos com módulos e flashcards personalizados.',
      status: 'upcoming',
      accentColor: 'text-cyan-400',
      gradient: 'from-cyan-600/20 via-slate-900 to-blue-900/10',
      borderHover: 'hover:border-cyan-500/60',
      iconBg: 'bg-cyan-600/20 border-cyan-500/40 text-cyan-400',
      tagColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60',
      badgeColor: 'bg-cyan-950 text-cyan-400 border-cyan-800/80',
      modulesCount:
        (hasFlashcards ? 1 : 0) +
        (hasResumo ? 1 : 0) +
        (hasSimulado ? 1 : 0) +
        (hasDiagramas ? 1 : 0),
      stats: {
        flashcards: hasFlashcards ? 20 : 0,
        questions: hasSimulado ? 10 : 0,
        topics: hasResumo ? 5 : 0,
        exercises: hasDiagramas ? 10 : 0,
      },
      modules: [
        ...(hasFlashcards
          ? [
              {
                id: 'flashcards' as const,
                title: `Flashcards de ${title}`,
                tag: '20 Cartas',
                badge: 'Em Preparação',
                description: `Cartas de repetição ativa para memorizar tópicos de ${title}.`,
                available: false,
              },
            ]
          : []),
        ...(hasResumo
          ? [
              {
                id: 'resumo' as const,
                title: `Resumo Teórico de ${title}`,
                tag: '5 Tópicos',
                badge: 'Em Preparação',
                description: `Síntese e pontos-chave cobrados nas avaliações.`,
                available: false,
              },
            ]
          : []),
        ...(hasSimulado
          ? [
              {
                id: 'simulado' as const,
                title: `Simulado de ${title}`,
                tag: '10 Questões',
                badge: 'Em Preparação',
                description: `Simulação de prova com correção e pontuação.`,
                available: false,
              },
            ]
          : []),
        ...(hasDiagramas
          ? [
              {
                id: 'diagramas' as const,
                title: `Exercícios Práticos de ${title}`,
                tag: '10 Desafios',
                badge: 'Em Preparação',
                description: `Prática interativa e modelagem para fixação.`,
                available: false,
              },
            ]
          : []),
      ],
    };

    onAddSubject(newSubject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#0d121f] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BookPlus size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">
                Adicionar Nova Matéria
              </h2>
              <p className="text-[11px] text-zinc-400">
                Expanda seu Hub acadêmico com novas disciplinas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Seletor de Abas */}
        <div className="flex border-b border-white/[0.06] bg-white/[0.01]">
          <button
            type="button"
            onClick={() => setTab('form')}
            className={`flex-1 py-2.5 text-xs font-medium text-center border-b-2 transition-all cursor-pointer ${
              tab === 'form'
                ? 'border-blue-500 text-blue-400 bg-white/[0.02]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Formulário Rápido
          </button>
          <button
            type="button"
            onClick={() => setTab('code')}
            className={`flex-1 py-2.5 text-xs font-medium text-center border-b-2 transition-all cursor-pointer ${
              tab === 'code'
                ? 'border-blue-500 text-blue-400 bg-white/[0.02]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Como incluir no Código
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">
          {tab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                  Nome da Matéria *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Redes de Computadores, Sistemas Operacionais..."
                  className="w-full h-9 px-3 text-xs bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Código
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Ex: RC-101"
                    className="w-full h-9 px-3 text-xs bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none transition-all uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Semestre
                  </label>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Ex: B1, B2"
                    className="w-full h-9 px-3 text-xs bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ex: Infraestrutura"
                    className="w-full h-9 px-3 text-xs bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                  Descrição Resumida
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Principais temas abordados na matéria..."
                  className="w-full p-2.5 text-xs bg-white/[0.03] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-2">
                  Módulos de Estudo Inclusos nesta Matéria
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04]">
                    <input
                      type="checkbox"
                      checked={hasFlashcards}
                      onChange={(e) => setHasFlashcards(e.target.checked)}
                      className="rounded text-blue-500"
                    />
                    <span className="text-xs text-zinc-200">🃏 Flashcards</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04]">
                    <input
                      type="checkbox"
                      checked={hasResumo}
                      onChange={(e) => setHasResumo(e.target.checked)}
                      className="rounded text-blue-500"
                    />
                    <span className="text-xs text-zinc-200">📘 Resumo Teórico</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04]">
                    <input
                      type="checkbox"
                      checked={hasSimulado}
                      onChange={(e) => setHasSimulado(e.target.checked)}
                      className="rounded text-blue-500"
                    />
                    <span className="text-xs text-zinc-200">🏆 Simulado Oficial</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04]">
                    <input
                      type="checkbox"
                      checked={hasDiagramas}
                      onChange={(e) => setHasDiagramas(e.target.checked)}
                      className="rounded text-blue-500"
                    />
                    <span className="text-xs text-zinc-200">📐 Exercícios/Prática</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Adicionar ao Hub</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200">
                Para adicionar matérias de forma definitiva e versionada no git,
                basta editar o arquivo <code className="font-mono text-cyan-300">src/data/subjects.ts</code>.
              </div>
              <pre className="p-3 rounded-xl bg-black/60 border border-white/[0.08] text-[11px] font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`// src/data/subjects.ts
export const DEFAULT_SUBJECTS: SubjectItem[] = [
  // ... matérias existentes ...
  {
    id: 'redes-computadores',
    title: 'Redes de Computadores',
    code: 'RC-101',
    semester: 'B1',
    category: 'Infraestrutura',
    description: 'Camadas OSI/TCP-IP, roteamento, IPv4/IPv6 e protocolos HTTP, DNS e TLS.',
    status: 'available', // ou 'upcoming'
    // ... defina os flashcards, resumos e simulados aqui!
  }
];`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
