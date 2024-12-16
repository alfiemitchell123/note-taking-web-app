import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default {
    languageOptions: {
        parser, // Use @typescript-eslint/parser
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: './tsconfig.json', // Path to your tsconfig.json
            tsconfigRootDir: process.cwd(), // Ensure this points to the project root
        },
    },
    ignores: [
        'backend/dist/**/*', // Ignore build files
        'coverage/**/*', // Ignore coverage files
        'node_modules/**/*', // Ignore dependencies
        'jest.config.js',
        'eslint.config.mjs',
    ],
    plugins: {
        '@typescript-eslint': ts, // Register the plugin
    },
    rules: {
        // JavaScript and TypeScript recommended rules
        ...js.configs.recommended.rules,
        ...ts.configs.recommended.rules,

        // Custom rules
        '@typescript-eslint/no-unused-vars': ['error'], // Example: highlight unused vars
        'no-console': 'warn', // Warn on console statements
        'eslint-disable': 'off', // Disable eslint-disable directive warnings
    },
};
