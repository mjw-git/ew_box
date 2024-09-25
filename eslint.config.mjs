import globals from 'globals'
import eslint_js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'

import reactHooksPlugin from 'eslint-plugin-react-hooks'
import eslintConfigPrettier from 'eslint-config-prettier'

const customTsFlatConfig = [
  {
    name: 'typescript-eslint/base',
    languageOptions: {
      parser: tsEslintParser,
      sourceType: 'module',
    },
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
    },
    plugins: {
      // ts 语法特有的规则，例如泛型
      '@typescript-eslint': tsEslintPlugin,
    },
  },
]

export default [
  // es  lint默认规则
  eslint_js.configs.recommended,

  // prettier 默认推荐规则
  eslintPluginPrettierRecommended,
  //ts默认规则
  ...customTsFlatConfig,
  {
    name: 'global config',
    languageOptions: {
      globals: {
        ...globals.es2022,
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      //关闭不能再promise中使用ansyc
      'no-async-promise-executor': 'off',
      //关闭不能再常量中使用??
      'no-constant-binary-expression': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      //禁止失去精度的字面数字
      '@typescript-eslint/no-loss-of-precision': 'off',
    },
  },

  {
    ignores: ['**/node_modules', '**/dist', '**/output'],
  },
  {
    name: 'react-eslint',
    files: ['src/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      ...reactPlugin.configs.recommended.languageOptions,
      // parserOptions: {
      //   ecmaFeatures: {
      //     jsx: true,
      //   },
      // },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
    },
    settings: {
      react: {
        // 需要显示安装 react
        version: 'detect',
      },
    },
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  eslintConfigPrettier,
]
