const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'tpbzfn',
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/output.xml',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: 'cypress/**/*.cy.{js,ts,jsx,tsx}',
  },
})
