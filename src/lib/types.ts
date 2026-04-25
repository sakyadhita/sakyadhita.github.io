import type { CollectionEntry } from 'astro:content'

export interface ConferenceResource {
  description: string
  url: string
}

export type ConferenceEntry = CollectionEntry<'conference'> & {
  data: {
    optimizedImages: string[] | null
    htmlBody: string
    brochures?: ConferenceResource[]
    programs?: ConferenceResource[]
    abstracts?: ConferenceResource[]
    presentations?: ConferenceResource[]
  }
}

export interface NewsAndEvents {
  title: string
  subtitle?: string
  imageLink: string
  redirectLink?: string
  optimizedImage?: string
  description?: string
  date?: string | Date
}

export interface PublicationEntry extends CollectionEntry<'publication'> {
  data: CollectionEntry<'publication'>['data'] & {
    optimizedImage?: string
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
