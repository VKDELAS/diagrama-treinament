import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -600, y: -600 });
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: fine)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Escuta mudanças de dispositivo apontador (mouse/touch)
    const mediaQuery = window.matchMedia('(pointer: fine)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Pega o elemento exatamente abaixo da ponta do cursor do mouse
      const target = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;

      if (!target) {
        setIsPointerActive(false);
        return;
      }

      // Se o mouse estiver sobre qualquer elemento interativo, card, texto, botão, cabeçalho ou modal:
      // O efeito NÃO deve aparecer (ele só pega no background limpo da página).
      const isOverContent = Boolean(
        target.closest(
          'button, a, input, select, textarea, [role="button"], [role="dialog"], header, footer, nav, article, section, [data-content-box="true"], .group, h1, h2, h3, h4, h5, h6, p, ul, ol, li, span, code, pre, svg, table, [data-interactive="true"]'
        )
      );

      // Além disso, verificamos se o elemento é o container de fundo ou tem data-page-bg="true"
      const isDirectBackground =
        target.getAttribute('data-page-bg') === 'true' ||
        target === document.body ||
        target === document.documentElement ||
        target.id === 'root';

      // O efeito só é ativado se estiver estritamente no background e não estiver sobre nenhum elemento de conteúdo
      if (isDirectBackground && !isOverContent) {
        setIsPointerActive(true);
      } else {
        setIsPointerActive(false);
      }
    };

    const handlePointerLeave = () => {
      setIsPointerActive(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Orbe Primária Azul/Ciano Estática (SEM ANIMAÇÃO DE MOVIMENTO) */}
      <div
        className="absolute top-1/6 left-1/4 w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full blur-[100px] sm:blur-[140px] opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(59, 130, 246, 0.14) 45%, rgba(14, 165, 233, 0.04) 75%, transparent 100%)',
        }}
      />

      {/* 2. Orbe Secundária Roxa/Índigo Estática (SEM ANIMAÇÃO DE MOVIMENTO) */}
      <div
        className="absolute bottom-1/6 right-1/4 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] rounded-full blur-[95px] sm:blur-[130px] opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(99, 102, 241, 0.10) 50%, transparent 100%)',
        }}
      />

      {/* 3. EFEITO DO MOUSE: SÓ APARECE NO BACKGROUND (Some ao passar por cima de qualquer card, texto, botão ou elemento) */}
      {isFinePointer && (
        <div
          className={`absolute rounded-full pointer-events-none transition-opacity duration-150 ${
            isPointerActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: '460px',
            height: '460px',
            left: `${mousePos.x - 230}px`,
            top: `${mousePos.y - 230}px`,
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(99, 102, 241, 0.08) 35%, rgba(6, 182, 212, 0.02) 65%, transparent 80%)',
            filter: 'blur(32px)',
          }}
        />
      )}
    </div>
  );
};
