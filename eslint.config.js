import globals from "globals";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.browser,
                process: 'readonly',
                Electron: 'readonly',
                DocumentReadyState: 'readonly',
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
        },
    },
];