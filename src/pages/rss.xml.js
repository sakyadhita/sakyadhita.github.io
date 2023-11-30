import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const blog = await getCollection('news')
  return rss({
    title: 'Sakyadhita',
    description: 'International association of Buddhist women',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `${context.site}blog/${post.slug}/`
    }))
  })
}
