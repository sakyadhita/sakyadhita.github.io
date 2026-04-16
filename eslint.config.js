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
  
  // React
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
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
