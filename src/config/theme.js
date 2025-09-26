// =========================================
// 🎨 TEMA RETRO - KEEP BOUNCING
// Sistema de Tema Unificado con Generación Automática de CSS
// =========================================

/**
 * Configuración completa del tema retro
 * Todas las modificaciones se hacen aquí y se propagan automáticamente
 */
const themeConfig = {
  name: 'retro-vibes',

  // 🎨 Paleta de colores principal
  colors: {
    // Colores principales
    primary: '#F7E96A', // Amarillo claro (sol, energía)
    secondary: '#D4C1E0', // Morado claro (suave, místico)
    accent: '#F24B3A', // Rojo (pasión, corazón)
    success: '#6B9C5D', // Verde (naturaleza, crecimiento)
    dark: '#000000', // Negro (fondo, contraste)

    // Variaciones de los colores principales
    primaryLight: '#FAF0A4', // Amarillo más claro
    primaryDark: '#E6D147', // Amarillo más oscuro
    secondaryLight: '#E6D9F0', // Morado más claro
    secondaryDark: '#C4A8D6', // Morado más oscuro
    accentLight: '#F56B5C', // Rojo más claro
    accentDark: '#D63426', // Rojo más oscuro
    successLight: '#8BB07E', // Verde más claro
    successDark: '#5A8A4D', // Verde más oscuro

    // Colores neutros retro
    white: '#FFF8E1', // Blanco cremoso retro
    lightGray: '#F5F5DC', // Beige claro
    gray: '#D2B48C', // Tan/beige
    darkGray: '#8B7355', // Marrón claro
    black: '#2F1B14', // Negro cálido

    // Estados específicos
    error: '#F24B3A', // Usa el rojo accent
    warning: '#F7E96A', // Usa el amarillo primary
    info: '#D4C1E0', // Usa el morado secondary
  },

  // 🌅 Gradientes retro
  gradients: {
    sunset: 'linear-gradient(135deg, #F7E96A 0%, #F24B3A 100%)',
    nature: 'linear-gradient(135deg, #6B9C5D 0%, #F7E96A 100%)',
    dreamy: 'linear-gradient(135deg, #D4C1E0 0%, #F7E96A 100%)',
    retro: 'linear-gradient(135deg, #F24B3A 0%, #D4C1E0 50%, #F7E96A 100%)',
    dark: 'linear-gradient(135deg, #2F1B14 0%, #000000 100%)',
  },

  // ✍️ Tipografía retro
  fonts: {
    primary: '"Courier New", "Monaco", "Lucida Console", monospace',
    secondary: '"Georgia", "Times New Roman", serif',
    display: '"Impact", "Arial Black", sans-serif',
    body: '"Verdana", "Geneva", sans-serif',
  },

  // 📏 Tamaños de fuente
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  // 📐 Espaciado retro
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },

  // 🔲 Border radius retro (más cuadrado)
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    full: '9999px',
  },

  // 🌑 Sombras retro (más pronunciadas)
  shadows: {
    sm: '0 1px 2px 0 rgba(47, 27, 20, 0.3)',
    base: '0 1px 3px 0 rgba(47, 27, 20, 0.4), 0 1px 2px 0 rgba(47, 27, 20, 0.3)',
    md: '0 4px 6px -1px rgba(47, 27, 20, 0.4), 0 2px 4px -1px rgba(47, 27, 20, 0.3)',
    lg: '0 10px 15px -3px rgba(47, 27, 20, 0.4), 0 4px 6px -2px rgba(47, 27, 20, 0.3)',
    xl: '0 20px 25px -5px rgba(47, 27, 20, 0.4), 0 10px 10px -5px rgba(47, 27, 20, 0.3)',
    retro: '4px 4px 0px rgba(47, 27, 20, 0.8)',
    retroLarge: '8px 8px 0px rgba(47, 27, 20, 0.8)',
  },

  // ✨ Transiciones retro (más lentas y dramáticas)
  transitions: {
    fast: 'all 0.15s ease-out',
    base: 'all 0.3s ease-out',
    slow: 'all 0.5s ease-out',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // 📱 Breakpoints responsive
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // 📚 Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
}

/**
 * 🎨 ThemeManager - Clase para manejar el tema dinámicamente
 */
class ThemeManager {
  constructor(config) {
    this.config = config
    this.injectedStyle = null
  }

  /**
   * Aplica el tema completo a la aplicación
   */
  apply() {
    const css = this.generateCSS()
    this.injectCSS(css)
  }

  /**
   * Actualiza el tema con nueva configuración
   */
  update(newConfig) {
    this.config = { ...this.config, ...newConfig }
    this.apply()
  }

  /**
   * Genera todo el CSS desde la configuración
   */
  generateCSS() {
    return `
/* ========================================= */
/* 🎨 TEMA RETRO - KEEP BOUNCING */
/* Generado automáticamente desde theme.js */
/* ========================================= */

:root {
  /* === 🎨 COLORES PRINCIPALES === */
  ${this.generateColorVariables()}

  /* === 🌅 GRADIENTES RETRO === */
  ${this.generateGradientVariables()}

  /* === ✍️ TIPOGRAFÍA === */
  ${this.generateFontVariables()}

  /* === 📏 TAMAÑOS DE FUENTE === */
  ${this.generateFontSizeVariables()}

  /* === 📐 ESPACIADO === */
  ${this.generateSpacingVariables()}

  /* === 🔲 BORDER RADIUS === */
  ${this.generateBorderRadiusVariables()}

  /* === 🌑 SOMBRAS RETRO === */
  ${this.generateShadowVariables()}

  /* === ✨ TRANSICIONES === */
  ${this.generateTransitionVariables()}
}

/* === 🎨 ESTILOS BASE RETRO === */
${this.generateBaseStyles()}

/* === 🧰 UTILIDADES RETRO === */
${this.generateUtilityClasses()}

/* === 🎭 ANIMACIONES RETRO === */
${this.generateAnimations()}

/* === 📱 RESPONSIVE === */
${this.generateResponsiveStyles()}
`
  }

  /**
   * Genera variables CSS para colores
   */
  generateColorVariables() {
    return Object.entries(this.config.colors)
      .map(([key, value]) => `  --color-${this.toKebabCase(key)}: ${value};`)
      .join('\n')
  }

  /**
   * Genera variables CSS para gradientes
   */
  generateGradientVariables() {
    return Object.entries(this.config.gradients)
      .map(([key, value]) => `  --gradient-${key}: ${value};`)
      .join('\n')
  }

  /**
   * Genera variables CSS para fuentes
   */
  generateFontVariables() {
    return Object.entries(this.config.fonts)
      .map(([key, value]) => `  --font-${key}: ${value};`)
      .join('\n')
  }

  /**
   * Genera variables CSS para tamaños de fuente
   */
  generateFontSizeVariables() {
    return Object.entries(this.config.fontSizes)
      .map(([key, value]) => `  --text-${key}: ${value};`)
      .join('\n')
  }

  /**
   * Genera variables CSS para espaciado
   */
  generateSpacingVariables() {
    return Object.entries(this.config.spacing)
      .map(([key, value]) => `  --space-${key}: ${value};`)
      .join('\n')
  }

  /**
   * Genera variables CSS para border radius
   */
  generateBorderRadiusVariables() {
    return Object.entries(this.config.borderRadius)
      .map(([key, value]) => `  --radius-${key}: ${value};`)
      .join('\n')
  }

  /**
   * Genera variables CSS para sombras
   */
  generateShadowVariables() {
    return Object.entries(this.config.shadows)
      .map(([key, value]) => `  --shadow-${key}: ${value};`)
      .join('\n')
  }

  /**
   * Genera variables CSS para transiciones
   */
  generateTransitionVariables() {
    return Object.entries(this.config.transitions)
      .map(([key, value]) => `  --transition-${key}: ${value};`)
      .join('\n')
  }

  /**
   * Genera estilos base
   */
  generateBaseStyles() {
    return `
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background: var(--gradient-dark);
  color: var(--color-white);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  line-height: 1.6;
}`
  }

  /**
   * Genera clases de utilidad
   */
  generateUtilityClasses() {
    return `
.retro-card {
  background: var(--color-white);
  color: var(--color-black);
  border: 3px solid var(--color-dark);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-retro);
  transition: var(--transition-bounce);
}

.retro-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-retro-large);
}

.retro-button {
  background: var(--color-primary);
  color: var(--color-black);
  border: 3px solid var(--color-dark);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg);
  font-family: var(--font-primary);
  font-weight: bold;
  font-size: var(--text-lg);
  cursor: pointer;
  box-shadow: var(--shadow-retro);
  transition: var(--transition-bounce);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.retro-button:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-retro-large);
}

.retro-button:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-sm);
}

.retro-button:disabled {
  background: var(--color-gray);
  color: var(--color-dark-gray);
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow-base);
}

.retro-button--accent {
  background: var(--color-accent);
  color: var(--color-white);
}

.retro-button--accent:hover:not(:disabled) {
  background: var(--color-accent-dark);
}

.retro-button--secondary {
  background: var(--color-secondary);
  color: var(--color-black);
}

.retro-button--secondary:hover:not(:disabled) {
  background: var(--color-secondary-dark);
}

.retro-button--success {
  background: var(--color-success);
  color: var(--color-white);
}

.retro-button--success:hover:not(:disabled) {
  background: var(--color-success-dark);
}

.retro-input {
  background: var(--color-white);
  color: var(--color-black);
  border: 3px solid var(--color-dark);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  box-shadow: inset 2px 2px 4px rgba(47, 27, 20, 0.2);
  transition: var(--transition-base);
}

.retro-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow:
    inset 2px 2px 4px rgba(47, 27, 20, 0.2),
    0 0 0 3px var(--color-primary-light);
}

.retro-input--error {
  border-color: var(--color-accent);
  background: rgba(242, 75, 58, 0.1);
}

.retro-input--success {
  border-color: var(--color-success);
  background: rgba(107, 156, 93, 0.1);
}

.retro-title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--color-primary);
  text-shadow: 3px 3px 0px var(--color-dark);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
}

.retro-subtitle {
  font-family: var(--font-secondary);
  font-size: var(--text-xl);
  color: var(--color-secondary);
  font-style: italic;
  margin: var(--space-sm) 0;
}

.retro-text {
  font-family: var(--font-body);
  color: var(--color-white);
  line-height: 1.6;
}`
  }

  /**
   * Genera animaciones
   */
  generateAnimations() {
    return `
@keyframes retro-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes retro-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes retro-shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.retro-bounce {
  animation: retro-bounce 2s infinite;
}

.retro-pulse {
  animation: retro-pulse 2s infinite;
}

.retro-shake {
  animation: retro-shake 0.5s ease-in-out;
}`
  }

  /**
   * Genera estilos responsive
   */
  generateResponsiveStyles() {
    return `
@media (max-width: 768px) {
  .retro-title {
    font-size: var(--text-3xl);
  }

  .retro-subtitle {
    font-size: var(--text-lg);
  }

  .retro-button {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--text-base);
  }

  .retro-card {
    margin: var(--space-sm);
  }
}`
  }

  /**
   * Inyecta el CSS en el documento
   */
  injectCSS(css) {
    // Remover estilo anterior si existe
    if (this.injectedStyle) {
      this.injectedStyle.remove()
    }

    // Crear nuevo elemento style
    this.injectedStyle = document.createElement('style')
    this.injectedStyle.textContent = css
    this.injectedStyle.setAttribute('data-theme', this.config.name)

    // Insertar al inicio del head
    document.head.insertBefore(this.injectedStyle, document.head.firstChild)
  }

  /**
   * Convierte camelCase a kebab-case
   */
  toKebabCase(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  }
}

// =========================================
// 🚀 INSTANCIA Y EXPORTS
// =========================================

// Crear instancia del ThemeManager
const themeManager = new ThemeManager(themeConfig)

// Inicializar el tema automáticamente al importar el módulo
if (typeof window !== 'undefined') {
  // Solo inicializar en el navegador (no en SSR)
  themeManager.apply()
}

// Exportar la configuración del tema
export const theme = themeConfig

// Exportar funciones helper
export const getColor = (colorPath) => {
  const keys = colorPath.split('.')
  let result = theme.colors

  for (const key of keys) {
    result = result[key]
    if (!result) return null
  }

  return result
}

// Función para inicializar el tema (ya se hace automáticamente)
export const initTheme = () => {
  themeManager.apply()
  return themeManager
}

// Función para actualizar el tema dinámicamente
export const updateTheme = (newConfig) => {
  themeManager.update(newConfig)
}

// Export por defecto
export default themeManager
