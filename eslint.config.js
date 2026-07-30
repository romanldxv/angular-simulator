// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.app.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@angular-eslint': angular.tsPlugin,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'padded-blocks': ['error', { classes: 'always' }],
      quotes: ['warn', 'single', { allowTemplateLiterals: true }],
      'object-curly-spacing': ['warn', 'always'],
      'template-curly-spacing': ['warn', 'always'],
      semi: ['warn', 'always'],
      'lines-between-class-members': [
        'error',
        {
          enforce: [{ blankLine: 'always', prev: '*', next: 'method' }],
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'interface',
          prefix: ['I'],
          format: ['PascalCase'],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [],
    languageOptions: {
      parser: angular.templateParser,
    },
    plugins: {
      //@ts-expect-error
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'warn',
      '@angular-eslint/template/no-nested-tags': 'error',
    },
  },
  // prettierConfig,
  // {
  //   files: ['**/*.{ts,js,html}'],
  //   plugins: {
  //     prettier: prettierPlugin,
  //   },
  //   rules: {
  //     'prettier/prettier': 'error',
  //   },
  // },
]);
