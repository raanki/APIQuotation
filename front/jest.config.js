const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // Ajoutez ces options pour résoudre les problèmes de processus
  forceExit: true,
  detectOpenHandles: true,
  // Timeout plus long pour les tests asynchrones
  testTimeout: 10000,
};

module.exports = createJestConfig(customJestConfig);