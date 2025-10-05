module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  plugins: [
    '@typescript-eslint',
    'node',
    'import'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    node: true,
    es2020: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',

    // Node.js specific rules
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off', // TypeScript handles this
    'node/no-unpublished-import': 'off',
    'node/no-extraneous-import': 'off', // npm handles this

    // Import/Export rules
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always'
    }],
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',

    // General rules
    'no-console': 'off', // Allow console in Lambda functions
    'no-debugger': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'eqeqeq': 'error',
    'curly': 'error',
    'comma-dangle': ['warn', 'never'],
    'semi': ['error', 'always'],
    'quotes': ['warn', 'single'],
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',

    // Serverless/Lambda specific
    'no-process-env': 'off' // Lambda functions use process.env
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      env: {
        jest: true
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-console': 'off'
      }
    },
    {
      files: ['serverless.ts', 'jest.config.js', '.eslintrc.js'],
      rules: {
        'node/no-unpublished-require': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
