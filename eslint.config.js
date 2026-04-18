import tseslint from 'typescript-eslint'
import astroPlugin from 'eslint-plugin-astro'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import markdown from '@eslint/markdown'
import globals from 'globals'
import astroParser from 'astro-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**']
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
      ]
    }
  },
  
  // React + JSX-a11y (minimal rules to avoid flat config incompatibility)
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
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
    }
  },

  // Markdown
  {
    files: ['**/*.md'],
    plugins: {
      markdown
    },
    language: 'markdown/commonmark'
  }
)
