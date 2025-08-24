import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
   { ignores: ['dist'] },
   {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      plugins: {
         'unused-imports': unusedImports,
      },
      rules: {
         quotes: ['error', 'single'],
         '@typescript-eslint/no-unused-vars': 'error',
         'unused-imports/no-unused-imports': 'error',
      },
   },
);
