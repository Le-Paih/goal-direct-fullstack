import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
  },
  {
    rules: {
      'prettier/prettier': 'off',
      'spaced-comment': 'off',
      'no-console': 'warn',
      'consistent-return': 'off',
      'func-names': 'off',
      'object-shorthand': 'off',
      'no-process-exit': 'off',
      'no-param-reassign': 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
    },
    env: {
      node: true,
    },
  },
];
