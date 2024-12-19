/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  testEnvironment: "jsdom",

  moduleNameMapper: { "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js" ,
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@localStorage/(.*)$': '<rootDir>/src/localStorage/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@state/(.*)$': '<rootDir>/src/state/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether each individual test should be reported during the run
  verbose: true,

};

export default config;
