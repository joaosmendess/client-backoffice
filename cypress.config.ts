import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Altere de acordo com o caminho em que seu frontend roda
    specPattern: 'cypress/e2e/**/*.spec.js', // Atualize o caminho conforme necessário
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/index.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 20000,
  },
});
