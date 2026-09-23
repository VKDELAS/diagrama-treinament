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
      setIsPointerActive(true);
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
      {/* 1. BOLA QUE SE MEXE BEM LENTAMENTE NO FUNDO (Orbe Primária Azul/Ciano) */}
      <div
        className="absolute top-1/4 left-1/4 w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full animate-float-orb blur-[90px] sm:blur-[130px] opacity-70 transition-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(99, 102, 241, 0.2) 40%, rgba(14, 165, 233, 0.06) 70%, transparent 100%)',
        }}
      />

      {/* 2. ORBE SECUNDÁRIA COMPLEMENTAR (Flutua bem lentamente em roxo/índigo) */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] rounded-full animate-float-orb-secondary blur-[85px] sm:blur-[120px] opacity-60 transition-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(59, 130, 246, 0.14) 50%, transparent 100%)',
        }}
      />

      {/* 3. EFEITO DE SEGUIR O MOUSE (Spotlight luminoso suave que acompanha o cursor) */}
      {isFinePointer && (
        <div
          className={`absolute rounded-full pointer-events-none transition-opacity duration-300 ${
            isPointerActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: '520px',
            height: '520px',
            left: `${mousePos.x - 260}px`,
            top: `${mousePos.y - 260}px`,
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.08) 35%, rgba(59, 130, 246, 0.02) 65%, transparent 80%)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '250ms, 80ms',
            transitionTimingFunction: 'ease-out',
            filter: 'blur(35px)',
          }}
        />
      )}
    </div>
  );
};
