import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from 'eslint-config-prettier';


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { files: ["**/*.{js,mjs,cjs,vue}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"] },
  pluginVue.configs["flat/essential"],
  prettier,
  {
    rules: {
      'vue/multi-word-component-names': 'off', // Permitir nombres de un solo componente
      'vue/no-unused-vars': 'warn', // Advertencia si hay variables sin usar en Vue
      'no-console': 'warn', // Advertencia si se usa console.log()
      'no-debugger': 'warn' // Advertencia si se usa debugger
    }
  }
]);