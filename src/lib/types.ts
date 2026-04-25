import type { ImageMetadata } from 'astro'
import type { CollectionEntry } from 'astro:content'

export interface ConferenceResource {
  description: string
  url: string | null
}

export type ConferenceEntry = CollectionEntry<'conference'> & {
  data: {
    optimizedImages: (ImageMetadata | string)[] | null
    htmlBody: string
    brochures?: ConferenceResource[]
    programs?: ConferenceResource[]
    abstracts?: ConferenceResource[]
    presentations?: ConferenceResource[]
  }
}

export interface NewsAndEvents {
  title?: string
  subtitle?: string
  imageLink: string | ImageMetadata
  redirectLink?: string
  optimizedImage?: string | ImageMetadata
  description?: string
  date?: string | Date
}

export interface PublicationEntry extends CollectionEntry<'publication'> {
  data: CollectionEntry<'publication'>['data'] & {
    optimizedImage?: string | ImageMetadata
  }
}

export interface PublicationSection {
  section_title: string
  section_list: PublicationEntry[]
}

export interface ConferenceStepChangeEvent extends CustomEvent {
  detail: {
    index: number
  }
}
