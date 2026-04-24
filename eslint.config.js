import tseslint from 'typescript-eslint'
import astroPlugin from 'eslint-plugin-astro'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import markdown from '@eslint/markdown'
import importPlugin from 'eslint-plugin-import'
import betterTailwindPlugin from 'eslint-plugin-better-tailwindcss'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import unicornPlugin from 'eslint-plugin-unicorn'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import astroParser from 'astro-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**', 'playwright-report/**']
  },

  // Base configuration
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,astro}'],
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
  ...tseslint.configs.recommended,
  {
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

  // React + JSX-a11y
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react-refresh': reactRefreshPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/set-state-in-effect': 'off'
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
      'astro/no-unused-define-vars-in-style': 'error'
    }
  },

  // Tailwind (Better Tailwind)
  {
    files: ['**/*.{jsx,tsx,astro}'],
    plugins: {
      'better-tailwindcss': betterTailwindPlugin
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/css/index.css'
      }
    },
    rules: {
      ...betterTailwindPlugin.configs.recommended.rules,
      'better-tailwindcss/no-unknown-classes': [
        'warn',
        {
          ignore: [
            'not-prose',
            'fade-in',
            'fade-in-0',
            'fade-out-0',
            'zoom-in-95',
            'zoom-out-95',
            'slide-in-from-bottom-4',
            'slide-in-from-top-4',
            'slide-in-from-top-2',
            'slide-in-from-bottom-2',
            'slide-in-from-left-2',
            'slide-in-from-right-2',
            'component-display',
            'outer',
            'home-map-tooltip',
            'error-asterisk',
            'volunteer-options',
            'left-options-column',
            'right-options-column',
            'input-field',
            'country-dropdown',
            'continue-button',
            'committee-row',
            'committee-title',
            'committee-description',
            'branding',
            'section',
            'scroll',
            'Slideshow',
            'custom-class'
          ]
        }
      ],
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
