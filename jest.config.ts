/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  testRegex: 'spec\\.ts$',
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  resetMocks: true,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};
