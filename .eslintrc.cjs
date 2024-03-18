/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:mdx/recommended',
    'plugin:markdown/recommended-legacy',
    'plugin:astro/recommended'
    // 'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest'
  },
  // plugins: ['react', 'prettier'],
  // rules: {
  //   'prettier/prettier': 'error',
  //   'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
  // },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    }
  ]
}
