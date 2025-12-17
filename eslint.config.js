import typescriptParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['.husky/', 'dist/', 'node_modules/'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: pluginPrettier,
    },
    rules: {
      // TypeScript 规则
      ...typescriptEslintPlugin.configs.recommended.rules,
      // Prettier 规则
      'prettier/prettier': 'warn',
      // 自定义规则
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  // 应用 Prettier 配置来禁用可能与 Prettier 冲突的规则
  configPrettier,
];
