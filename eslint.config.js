import markdown from '@eslint/markdown'
import tsParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import astroPlugin from 'eslint-plugin-astro'
import betterTailwindPlugin from 'eslint-plugin-better-tailwindcss'
import importPlugin from 'eslint-plugin-import-x'
import unicornPlugin from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '**/node_modules/**',
      'public/**',
      'playwright-report/**',
      '.netlify/**',
      'src/**/.astro/**'
    ]
  },

  // Base configuration
  {
    files: ['**/*.{js,mjs,cjs,ts,astro}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      import: importPlugin,
      unicorn: unicornPlugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      ...unicornPlugin.configs.recommended.rules,
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/null-as-undefined': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-query-selector': 'warn',
      'unicorn/no-array-reverse': 'warn',
      'unicorn/no-array-sort': 'warn',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import/no-duplicates': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  },

  // JS/TS
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ]
    }
  },

  // Tests
  {
    files: ['tests/**/*.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  // Astro
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module'
      }
    },
    rules: {
      'astro/no-unused-define-vars-in-style': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  // Tailwind (Better Tailwind)
  {
    files: ['**/*.astro'],
    plugins: {
      'better-tailwindcss': betterTailwindPlugin
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css'
      }
    },
    rules: {
      ...betterTailwindPlugin.configs.recommended.rules,
      'better-tailwindcss/no-unknown-classes': 'off',
      'better-tailwindcss/no-conflicting-classes': 'warn'
    }
  },

  // Markdown
  {
    files: ['**/*.md'],
    plugins: {
      markdown
    },
    language: 'markdown/commonmark'
  },

  // Prettier (must be last)
  eslintConfigPrettier
)
