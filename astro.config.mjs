import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://sakyadhita.org',

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Libre Baskerville',
      cssVariable: '--font-heading',
      weights: [400, 700],
      styles: ['normal', 'italic']
    },
    {
      provider: fontProviders.google(),
      name: 'Nunito',
      cssVariable: '--font-body',
      weights: [400, 600, 700],
      styles: ['normal']
    }
  ],

  devToolbar: {
    enabled: false
  },

  integrations: [sitemap(), icon()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [{ find: '/assets', replacement: '/src/assets' }]
    },
    assetsInclude: ['**/*.zip']
  },

  adapter: netlify()
})
