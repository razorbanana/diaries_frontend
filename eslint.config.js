import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,css}"]
  },
  {ignores: ["node_modules", "dist", "build", "coverage"]},
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-console": "error",
      "no-unused-vars": "warn",
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "padding-left": ["error", "2"],
      "quotes": ["error", "backtick"],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "object-curly-newline": ["error", { "multiline": true }]
    }
  }
];