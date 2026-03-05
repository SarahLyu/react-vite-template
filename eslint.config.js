import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import securityPlugin from 'eslint-plugin-security';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      import: importPlugin,
      security: securityPlugin,
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'arrow-body-style': ['error', 'as-needed'],
      'import/default': 'error',
      'import/export': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-deprecated': 'warn',
      'import/no-dynamic-require': 'error',
      'import/no-internal-modules': 'off',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-relative-parent-imports': 'off',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
            orderImportKind: 'ignore',
          },
          'newlines-between': 'always',
          distinctGroup: true,
          warnOnUnassignedImports: false,
        },
      ],
      'max-depth': ['warn', 4],
      'max-lines-per-function': [
        'warn',
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: false },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-var': 'error',
      'require-await': 'error',
      semi: ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': ['error', { ignore: ['children', 'className'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error',
    },
  }
);
