module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/_template.js'],
  testMatch: ['**/tests/?(*.)+(spec|test).js?(x)'],
  verbose: true,
  testEnvironmentOptions: {
    pretendToBeVisual: true
  }
}
