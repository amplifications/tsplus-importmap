const aliases = require('module-alias-jest/register');

import type { Config } from '@jest/types';

export const baseConfig: Config.InitialOptions =
  // require('../../jest.config.ts').config;
  {
    // nacleame: '<root>/jest.config.ts',
    coverageDirectory: 'test.coverage',

    testMatch: [
      '**/?(*.)+(spec|test|tspec).+(ts|tsx|js)',
      // '**/?(*.)+(ts)',
      // '**/?(*.)+(ts|tsx|js)',
      // '**/__tests__/**/*.+(ts|tsx|js)',
    ],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: [
      '@relmify/jest-fp-ts',
      'jest-mock-console/dist/setupTestFramework.js',
      // './jest.setup.ts', // <- Any more custom code to be provided here
    ],
    testPathIgnorePatterns: ['ignore', '/out', 'jest.config.ts'],
    collectCoverageFrom: ['./code/**'],
  };

export const config: Config.InitialOptions = {
  ...baseConfig,

  displayName: 'packages/app',
  testMatch: [
    '**/?(*.)+(spec|test|tspec).+(ts|tsx|js)',
    '**/?(*.)+(unified|u).+(ts|tsx|js)',
    // '**/?(*.)+(ts)',
    // '**/?(*.)+(ts|tsx|js)',
    // '**/__tests__/**/*.+(ts|tsx|js)',
  ],
  verbose: true,

  moduleNameMapper: {
    '^@xxx/(.*)$': '<rootDir>/code/xxx.try/try.tsplus/$1',
  },
  //testPathIgnorePatterns: ['jest.config.ts', 'global.d.ts',],
};

export const moduleNameMapper = aliases.jest;
export default config;
