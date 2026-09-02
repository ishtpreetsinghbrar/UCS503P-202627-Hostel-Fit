module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
};
