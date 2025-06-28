import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  ...js(),
  {
    files: ['**/*.jsx', '**/*.js'],
    plugins: { react },
    languageOptions: {
      globals: {
        // Jest globals
        test: true,
        expect: true,
        describe: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        afterEach: true,
        // Browser globals
        window: true,
        document: true,
      },
    },
    rules: {
      // your rules here
    },
  },
];
