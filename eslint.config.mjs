import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { globalIgnores } from 'eslint/config';
// 顶部引入 parser
import tsParser from '@typescript-eslint/parser';

const backendTsconfig = path.resolve(process.cwd(), 'apps/backend/tsconfig.json');

export default [
  // 全局忽略
  globalIgnores(['dist', 'build', 'node_modules', 'assets']),
  // 忽略自动生成的类型文件
  {
    ignores: [
      'apps/web/.react-router/types/**/*',
      // ...如有其他 ignore 可继续添加
    ],
  },
  // 针对所有 ts/tsx 文件的基础规则（不需要类型信息）
  // ...你原有的基础 ts/tsx 配置（如有）
  // 只对 web/src 下的 ts/tsx 文件开启 type-aware 规则
  {
    files: ['apps/web/src/**/*.ts', 'apps/web/src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./apps/web/tsconfig.json'],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      // ...如有其他 type-aware 规则可继续添加
    },
  },
  // 前端 React + 类型 lint，仅限 src 目录
  {
    files: ['apps/frontend/src/**/*.{ts,tsx,js,jsx}', 'apps/web/src/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    ...reactHooks.configs['recommended-latest'],
    ...reactRefresh.configs.vite,
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./apps/frontend/tsconfig.json', './apps/web/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
  // 针对 backend（NestJS）单独配置解析器，支持装饰器和类型
  {
    files: ['apps/backend/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          legacyDecorators: true,
        },
      },
    },
    rules: {
      // 可根据需要添加 type-aware 规则
    },
  },
]; 