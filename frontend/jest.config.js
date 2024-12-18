/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  testEnvironment: "jsdom",

  moduleNameMapper: { "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js" },

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

/*   transformIgnorePatterns: [
      "\\.css$"  // Ignore CSS files
    ], */
  // A map from regular expressions to paths to transformers
  // transform: undefined,

  // Indicates whether each individual test should be reported during the run
  verbose: true,

};

export default config;
