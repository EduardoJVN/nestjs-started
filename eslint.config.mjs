// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn', // Advertencia cuando se usa `any`
      '@typescript-eslint/no-unused-vars': 'warn', // Advertencia por variables no usadas
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Desactivar la regla para exigir tipos explícitos en funciones de módulos
      // 'import/no-unresolved': 'error', // Errores cuando no se puede resolver un módulo importado
      // 'import/no-named-as-default': 'off', // Desactiva una regla para mejorar la compatibilidad con ciertos imports
      'no-console': 'warn', // Advertencia para evitar el uso de `console.log`
      'no-unused-vars': 'off', // Desactiva la regla de ESLint para variables no usadas (porque la maneja `@typescript-eslint/no-unused-vars`)
    },
  },
);