import { rssSchema } from '@astrojs/rss'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const news = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    rssSchema.extend({
      imageLink: image(),
      redirectLink: z.string().optional(),
      draft: z.boolean().optional()
    })
})

const item = z.object({
  description: z.string(),
  url: z.string().nullable()
})

const branch = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/branch' }),
  schema: z.object({
    name: z.string(),
    isBranch: z.boolean(),
    email: z.string().email().optional(),
    latitude: z.number(),
    longitude: z.number(),
    siteLink: z.string().url().optional()
  })
})

const conference = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/conference' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      confNum: z.number().int().nonnegative(),
      location: z.string(),
      slideShowImages: image().array().optional(),
      programs: item.array().optional(),
      presentations: item.array().optional(),
      brochures: item.array().optional(),
      abstracts: item.array().optional(),
      video: z.string().url().optional(),
      signupLink: z.string().url().optional()
    })
})

const newsletter = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/newsletter' }),
  schema: ({ image }) =>
    z.object({
      volume: z.number().int().nonnegative(),
      number: z.number().int().nonnegative(),
      year: z.number().int().nonnegative(),
      pdfLink: z.string(),
      imageLink: image()
    })
})

const publication = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/publication' }),
  schema: ({ image }) =>
    z.object({
      category: z.string(),
      id: z.number().int().nonnegative(),
      title: z.string(),
      author: z.string(),
      feature: z.boolean(),
      description: z.string().optional(),
      imageLink: image(),
      pdfLink: z.string()
    })
})

const section = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/section' }),
  schema: ({ image }) =>
    z.object({
      page: z.string(),
      title: z.string(),
      subtitle: z.string().optional(),
      isPublished: z.boolean(),
      image: image().optional(),
      redirectLink: z.string().optional()
    })
})

const exco = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/exco' }),
  schema: ({ image }) =>
    z.object({
      subtitle: z.string().optional(),
      startYear: z.number().int().positive(),
      endYear: z.number().int().positive(),
      rank: z.number().int().optional(),
      name: z.string(),
      position: z.string(),
      imageLink: image().optional(),
      redirectLink: z.string().optional(),
      openInSameTab: z.boolean()
    })
})

const volinterest = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/volinterest' }),
  schema: z.object({
    title: z.string(),
    description: z.string()
  })
})

const membertype = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/membertype' }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    cost: z.number().optional()
  })
})

export const collections = {
  news,
  branch,
  conference,
  newsletter,
  publication,
  section,
  exco,
  volinterest,
  membertype
}
