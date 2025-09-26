import theme from './theme.js'

// Configuración general de la aplicación
export const appConfig = {
  name: 'Keep Bouncing',
  version: '1.0.0',
  description: 'Una aplicación retro con estilo vintage',

  // Configuración de la API
  api: {
    baseUrl: 'http://localhost:8000',
    timeout: 5000,
  },

  // Configuración de la app
  app: {
    defaultLanguage: 'es',
    supportedLanguages: ['es', 'en'],
    maxLoginAttempts: 5,
    sessionTimeout: 30 * 60 * 1000, // 30 minutos
  },

  // Configuración del tema
  theme,
}

// Exportar tema por separado para fácil acceso
export { theme }

// Exportar funciones helper
export { getColor, initTheme, updateTheme } from './theme.js'

export default appConfig
