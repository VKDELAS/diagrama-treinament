/**
 * Gerenciador e detector inteligente da barra de navegação inferior do celular (3 botões vs gestos).
 * Detecta se o dispositivo é Android com os clássicos 3 botões (Voltar, Início, Recentes)
 * e ajusta a variável CSS global --bottom-nav-safe dinamicamente para que nada seja coberto.
 */

export type BottomNavMode = 'auto' | '3buttons' | 'gestures' | 'custom';

export interface BottomNavSettings {
  mode: BottomNavMode;
  customPadding: number;
  detectedType: '3buttons' | 'gestures' | 'desktop';
}

const STORAGE_KEY_MODE = 'nexus_bottom_nav_mode';
const STORAGE_KEY_PADDING = 'nexus_bottom_nav_padding';

// Alturas padrão de respiro
export const DEFAULT_PADDING_3_BUTTONS = 76; // 48px da barra de botões do Android + 28px de folga estética
export const DEFAULT_PADDING_GESTURES = 24;  // Barra fina de gestos (iOS / Android 10+)
export const DEFAULT_PADDING_DESKTOP = 16;   // Dispositivos desktop com mouse

/**
 * Detecta se o dispositivo é mobile e se utiliza navegação por 3 botões virtuais na tela
 */
export function detectDeviceBottomBar(): {
  type: '3buttons' | 'gestures' | 'desktop';
  suggestedPadding: number;
} {
  if (typeof window === 'undefined') {
    return { type: 'desktop', suggestedPadding: DEFAULT_PADDING_DESKTOP };
  }

  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isMobile = isAndroid || isIOS || window.matchMedia('(pointer: coarse)').matches;

  if (!isMobile) {
    return { type: 'desktop', suggestedPadding: DEFAULT_PADDING_DESKTOP };
  }

  // No Android: se a diferença entre a altura física total da tela e o availHeight for perceptível,
  // ou se a altura interna em relação à tela indicar espaço reservado para barra de sistema:
  const screenHeight = window.screen.height;
  const availHeight = window.screen.availHeight || window.innerHeight;
  const innerHeight = window.innerHeight;
  
  const screenDiff = screenHeight - availHeight;
  const innerDiff = screenHeight - innerHeight;

  // Celulares Android tradicionais com 3 botões fixos costumam ter entre 40px e 80px ocupados
  if (isAndroid) {
    if (screenDiff >= 36 || innerDiff >= 48 || window.innerWidth <= 480) {
      return { type: '3buttons', suggestedPadding: DEFAULT_PADDING_3_BUTTONS };
    }
  }

  // Se houver entalhe do iPhone ou barra de gestos
  if (isIOS) {
    return { type: 'gestures', suggestedPadding: DEFAULT_PADDING_GESTURES };
  }

  // Padrão mobile seguro: assume 3 botões caso a tela seja estreita (smartphone típico)
  if (window.innerWidth < 500) {
    return { type: '3buttons', suggestedPadding: DEFAULT_PADDING_3_BUTTONS };
  }

  return { type: 'gestures', suggestedPadding: DEFAULT_PADDING_GESTURES };
}

/**
 * Aplica o padding seguro na raiz CSS (:root)
 */
export function applyBottomNavPadding(padding: number): void {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty('--bottom-nav-safe', `${padding}px`);
}

/**
 * Carrega as preferências salvas ou executa detecção automática
 */
export function getSavedBottomNavSettings(): BottomNavSettings {
  if (typeof window === 'undefined') {
    return { mode: 'auto', customPadding: DEFAULT_PADDING_3_BUTTONS, detectedType: 'desktop' };
  }

  const detection = detectDeviceBottomBar();
  const savedMode = (localStorage.getItem(STORAGE_KEY_MODE) as BottomNavMode) || 'auto';
  const savedPadding = parseInt(localStorage.getItem(STORAGE_KEY_PADDING) || '0', 10);

  let finalPadding = detection.suggestedPadding;

  if (savedMode === '3buttons') {
    finalPadding = DEFAULT_PADDING_3_BUTTONS;
  } else if (savedMode === 'gestures') {
    finalPadding = DEFAULT_PADDING_GESTURES;
  } else if (savedMode === 'custom' && savedPadding > 0) {
    finalPadding = savedPadding;
  } else {
    // Modo 'auto'
    finalPadding = detection.suggestedPadding;
  }

  applyBottomNavPadding(finalPadding);

  return {
    mode: savedMode,
    customPadding: savedPadding || finalPadding,
    detectedType: detection.type,
  };
}

/**
 * Salva as novas preferências do usuário
 */
export function saveBottomNavSettings(mode: BottomNavMode, customPadding?: number): number {
  if (typeof window === 'undefined') return DEFAULT_PADDING_3_BUTTONS;

  const detection = detectDeviceBottomBar();
  let paddingToApply = detection.suggestedPadding;

  if (mode === '3buttons') {
    paddingToApply = DEFAULT_PADDING_3_BUTTONS;
  } else if (mode === 'gestures') {
    paddingToApply = DEFAULT_PADDING_GESTURES;
  } else if (mode === 'custom' && customPadding !== undefined) {
    paddingToApply = customPadding;
  } else {
    // auto
    paddingToApply = detection.suggestedPadding;
  }

  localStorage.setItem(STORAGE_KEY_MODE, mode);
  if (customPadding !== undefined) {
    localStorage.setItem(STORAGE_KEY_PADDING, customPadding.toString());
  }

  applyBottomNavPadding(paddingToApply);
  return paddingToApply;
}
