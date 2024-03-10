const fs = require('fs');

const folders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

module.exports = {
  root: true,
  extends: [
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },

  plugins: ['simple-import-sort'],
  rules: {
    'no-param-reassign': [2, { props: false }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': 'off', // Since we do not use prop-types
    'react/require-default-props': 'off', // Since we do not use prop-types
    'no-restricted-imports': [
      'warn',
      {
        patterns: ['@features/*/*', '@core/*/*', '@contexts/*/*'],
      },
    ],
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/prefer-default-export': 'off',
    radix: 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ],
    '@typescript-eslint/naming-convention': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              // Packages. `react-native` related packages come first.
              // Things that start with a letter (or digit or underscore)
              // or `@` followed by a letter.
              ['^react-native', '^@?\\w'],
              // Absolute imports and Relative imports.
              [`^@(${folders.join('|')})(/.*|$)`, '^\\.'],
              ['^[^.]'],
            ],
          },
        ],
      },
    },
    {
      files: ['index.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['**/slices/**'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
    {
      files: ['tests/**/*'],
      env: {
        jest: true,
      },
    },
  ],
};
