import baseConfig, { restrictEnvAccess } from "@app/eslint-config/base";
import nextjsConfig from "@app/eslint-config/nextjs";
import reactConfig from "@app/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
