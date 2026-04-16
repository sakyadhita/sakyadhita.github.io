import astroPlugin from 'eslint-plugin-astro'
import * as mdxPlugin from 'eslint-plugin-mdx'
import markdownPlugin from 'eslint-plugin-markdown'
import tsParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**']
  },
  ...astroPlugin.configs.recommended,
  ...compat.extends('plugin:mdx/recommended'),
  ...markdownPlugin.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro']
      }
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
]
