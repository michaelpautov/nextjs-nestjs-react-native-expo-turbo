const nestConfig = require('@app/eslint-config-nest');

module.exports = {
  ...nestConfig,
  parserOptions: {
    ...nestConfig.parserOptions,
    project: './tsconfig.json',
  },
};
