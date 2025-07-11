// 合并根配置与 Expo 配置，保留 mobile 专属 ignores
// 注意：如根配置为 ESM，需用 require 导入（Node18+ 支持）
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const rootConfig = require('../../eslint.config.mjs').default || require('../../eslint.config.mjs');

module.exports = defineConfig([
  ...rootConfig,
  ...expoConfig,
  {
    ignores: ['dist/*'], // mobile 专属忽略
  },
]);
