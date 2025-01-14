const { JAVASCRIPT_FILES } = require('@vercel/style-guide/eslint/constants')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: { project: './tsconfig.json' },
  settings: {
    'import/resolver': { typescript: './tsconfig.json' },
  },
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        case: 'camelCase',
      },
    ],
    'import/no-cycle': 'warn',
  },
  overrides: [
    {
      files: JAVASCRIPT_FILES,
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      files: ['*.config.{mjs,ts,js}', 'src/**/{page,layout}.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': ['error', { target: 'any' }],
      },
    },
  ],
}
