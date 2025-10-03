export const appConfig = {
  name: 'Keep Bouncing',
  version: '1.0.0',
  description: 'Freestyle app',
  api: {
    baseUrl: 'http://localhost:8000',
    timeout: 5000,
  },
  app: {
    defaultLanguage: 'es',
    supportedLanguages: ['es', 'en'],
    maxLoginAttempts: 5,
    sessionTimeout: 30 * 60 * 1000, // 30 minutos
  },
}

export default appConfig
