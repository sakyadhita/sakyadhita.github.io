import { z, defineCollection } from 'astro:content'
import { rssSchema } from '@astrojs/rss'

const news = defineCollection({
  schema: ({ image }) =>
    rssSchema.extend({
      imageLink: z.string(),
      redirectLink: z.string().optional(),
      draft: z.boolean().optional()
    })
})

const item = z.object({
  description: z.string(),
  url: z.string()
})

const branch = defineCollection({
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
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      confNum: z.number().int().nonnegative(),
      location: z.string(),
      slideShowImages: z.string().array().optional(),
      programs: item.array().optional(),
      presentations: item.array().optional(),
      brochures: item.array().optional(),
      abstracts: item.array().optional(),
      video: z.string().url().optional(),
      signupLink: z.string().url().optional()
    })
})

const newsletter = defineCollection({
  schema: z.object({
    volume: z.number().int().nonnegative(),
    number: z.number().int().nonnegative(),
    year: z.number().int().nonnegative(),
    pdfLink: z.string(),
    imageLink: z.string()
  })
})

const publication = defineCollection({
  schema: ({ image }) =>
    z.object({
      category: z.string(),
      id: z.number().int().nonnegative(),
      title: z.string(),
      author: z.string(),
      feature: z.boolean(),
      description: z.string().optional(),
      imageLink: z.string(),
      pdfLink: z.string()
    })
})

const section = defineCollection({
  schema: ({ image }) =>
    z.object({
      page: z.string(),
      title: z.string(),
      subtitle: z.string().optional(),
      isPublished: z.boolean(),
      image: z.string().optional(),
      redirectLink: z.string().optional()
    })
})

const exco = defineCollection({
  schema: ({ image }) =>
    z.object({
      subtitle: z.string().optional(),
      startYear: z.number().int().positive(),
      endYear: z.number().int().positive(),
      rank: z.number().int().optional(),
      name: z.string(),
      position: z.string(),
      imageLink: z.string().optional().default('https://assets.ucsd.edu/img/icon/headshot.jpg'),
      redirectLink: z.string().optional(),
      openInSameTab: z.boolean()
    })
})

const volinterest = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string()
  })
})

const membertype = defineCollection({
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
