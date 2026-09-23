import React from 'react';
import {
  BookOpen,
  Award,
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  GraduationCap,
  Info,
} from 'lucide-react';
import type { AppModule } from '../types/navigation';

interface HubViewProps {
  onSelectModule: (module: AppModule) => void;
}

export const HubView: React.FC<HubViewProps> = ({ onSelectModule }) => {
  const modules = [
    {
      id: 'resumo' as AppModule,
      title: 'Resumo Teórico',
      tag: '7 Tópicos Essenciais',
      badge: 'Teoria Direta',
      description:
        'Relacional vs NoSQL, DER e níveis (conceitual, lógico, físico), tipos de atributos, cardinalidades e pegadinhas da prova.',
      icon: BookOpen,
      gradient: 'from-blue-600/20 via-slate-900 to-cyan-900/10',
      borderHover: 'hover:border-blue-500/60',
      iconBg: 'bg-blue-600/20 border-blue-500/40 text-blue-400',
      tagColor: 'text-blue-400 bg-blue-950/80 border-blue-800/60',
      accentColor: 'text-blue-400',
    },
    {
      id: 'simulado' as AppModule,
      title: 'Simulado Oficial',
      tag: '7 Questões • Vale 10,0',
      badge: 'Simulação de Prova',
      description:
        'Enunciados e alternativas originais, navegação 1 a 1, diagramas SVG redesenhados (Q5, Q6 e Q7) e correção detalhada no final.',
      icon: Award,
      gradient: 'from-emerald-600/20 via-slate-900 to-teal-900/10',
      borderHover: 'hover:border-emerald-500/60',
      iconBg: 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400',
      tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
      accentColor: 'text-emerald-400',
    },
    {
      id: 'flashcards' as AppModule,
      title: 'Flashcards de Fixação',
      tag: '+20 Cartas Interativas',
      badge: 'Repetição Ativa',
      description:
        'Cartas com frente e verso para memorizar gabarito, cardinalidades, tipos de atributos e lógica de chave composta.',
      icon: Sparkles,
      gradient: 'from-indigo-600/20 via-slate-900 to-purple-900/10',
      borderHover: 'hover:border-indigo-500/60',
      iconBg: 'bg-indigo-600/20 border-indigo-500/40 text-indigo-400',
      tagColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-800/60',
      accentColor: 'text-indigo-400',
    },
    {
      id: 'diagramas' as AppModule,
      title: 'Treino de Diagramas',
      tag: '52 Exercícios Práticos',
      badge: 'Módulo Existente',
      description:
        'Editor prático interativo com tela canvas para montar e conectar entidades, atributos e relacionamentos.',
      icon: Layers,
      gradient: 'from-amber-600/20 via-slate-900 to-orange-900/10',
      borderHover: 'hover:border-amber-500/60',
      iconBg: 'bg-amber-600/20 border-amber-500/40 text-amber-400',
      tagColor: 'text-amber-400 bg-amber-950/80 border-amber-800/60',
      accentColor: 'text-amber-400',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#090d16] text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600/30">
      {/* Topo / Barra Superior do Hub */}
      <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Database size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                Portal de Estudos ADS
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950 border border-blue-800/80 text-blue-400 font-semibold">
                B1
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Banco de Dados & NoSQL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/70 border border-slate-700/60 px-3 py-1.5 rounded-xl font-medium">
            <GraduationCap size={15} className="text-blue-400" />
            <span>Foco na Prova B1</span>
          </span>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 flex flex-col justify-center">
        {/* Cabeçalho de Boas-Vindas */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Preparatório Oficial B1
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Banco de Dados & NoSQL
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Escolha uma das modalidades abaixo para revisar conteúdos, testar
            seus conhecimentos no simulado ou praticar diagramas.
          </p>
        </div>

        {/* Grade Responsiva de Cards Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => onSelectModule(module.id)}
                className={`group relative text-left bg-gradient-to-br ${module.gradient} border border-slate-800 rounded-3xl p-5 sm:p-7 transition-all duration-200 ${module.borderHover} hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${module.iconBg} shadow-inner transition-transform group-hover:scale-105`}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${module.tagColor}`}
                    >
                      {module.tag}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {module.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 group-hover:text-slate-300">
                    {module.badge}
                  </span>
                  <div
                    className={`flex items-center gap-1.5 ${module.accentColor} group-hover:translate-x-1 transition-transform`}
                  >
                    <span>Acessar</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Lembrete de Regra da Prova */}
        <div className="mt-8 sm:mt-10 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start sm:items-center gap-3 text-xs text-slate-400">
          <Info size={18} className="text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-slate-200">Convenção de Leitura da Prova:</strong>{' '}
            o par escrito perto de uma entidade diz quantas ocorrências dessa
            entidade se ligam a cada ocorrência da outra. Ex.:{' '}
            <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">
              (0,N) perto de Compra
            </code>{' '}
            = cada cliente tem de zero a muitas compras.
          </p>
        </div>
      </main>

      {/* Rodapé Simples */}
      <footer className="w-full border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        Material de Estudo B1 • Banco de Dados e NoSQL • ADS
      </footer>
    </div>
  );
};
