module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  collectCoverageFrom: ['!**/__tests__/**', '!src/routes.ts'],
};
