import { groq } from 'next-sanity'
import { ImageAsset } from 'sanity'
import type { PortableTextBlock } from '@portabletext/types'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]`
export const globalSettingsQuery = groq`*[_type == "globalSettings"][0]{
  ...,
}`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
 ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  'toc':content[style == 'h2']{
    'text': children[0].text,
  },
  suggestedArticles[]->{
    ...,
  },
  "author": author->{name, picture},
}
`

export const workBySlugQuery = groq` 
*[_type == "caseStudy" && slug.current == $slug][0]{
  ...,
  modules[]{
    ...,
    _type == 'videoBlock'=>{
      video{
        asset->{
          playbackId,
          assetId,
          filename,
        }
      }
    }
  },
  nextProject->{
    ...,
  }
}
`

export const allWorkQuery = groq`
*[_type == "caseStudy"]  | order(date desc, _updatedAt desc)
`

export const allPostQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc)
`

export const workSlugsQuery = groq`
*[_type == "caseStudy" && defined(slug.current)][].slug.current
`

export const homepageQuery = groq`*[_type == 'homepageSettings'][0]{
  ...,

  heroTestimonial->{
    ...,
    _type,
  },
  caseStudies[]-> {
    _type == 'caseStudy' => {
      _id,
    title,
    slug,
    subtitle,
    thumbnailImage,
    linkTitle,
    caseStudyType,
    _type,
    },
    _type == 'testimonial' => {
      ...,
      _type,
    },
  },
  testimonials[]-> {
    ...,
  }
}
`
export interface PopupType {
  _id: string
  _createdAt: string
  isActive: boolean
  title: string
  description: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  cta: string
  link: string
  timer: number
}

export const recentWorkQuery = groq`
*[_type == "recentWork"] | order(date desc, _updatedAt desc){
...,
  video {
    asset-> {
      playbackId,
      assetId,
      filename,
    }
  }
}
`

export const recentWorkSettingsQuery = groq`
*[_type == 'recentWorkSettings'][0]{
  recentWork[]->{
  ...,
  video {
    asset-> {
      playbackId,
      assetId,
      filename,
    }
  }
  }
}
`

export interface RecentWork {
  title?: string
  image?: ImageAsset
  columns?: number
  year?: number
  alignment?: number
  video?: {
    asset: {
      playbackId: string
      assetId: string
      filename: string
    }
  }
}

export interface RecentWorkSettings {
  recentWork: RecentWork[]
}

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: {
    current: string
  }
  content?: any
  subtitle?: string
  cardSubtitle?: string
  metaDescription?: string
  metaTitle?: string
  metaKeywords?: string[]
  postOGImage?: ImageAsset
  readTime?: number
  toc?: {
    text: string
  }[]
  suggestedArticles: Post[]
}

export type HomepageCaseStudies = (Work | Testimonial)[]
export interface PopupType {
  _id: string
  _createdAt: string
  title: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  cta: string
  link: string
  timer: number
}

export interface HomepageSettings {
  heroTitle: string
  logoCloud: ImageAsset[]
  heroCarousel: ImageAsset[]
  caseStudies: HomepageCaseStudies
  testimonials: Testimonial[]
  heroTestimonial: Testimonial
  heroParagraph: PortableTextBlock
  dayRate: {
    USD: string
    EUR: string
    GBP: string
  }
  flexPricing: {
    title: string
    subTitle: string
    badge: string
    USD: string
    EUR: string
    GBP: string
  }
  partTimePricing: {
    title: string
    subTitle: string
    badge: string
    USD: string
    EUR: string
    GBP: string
  }
  dedicatedPricing: {
    title: string
    subTitle: string
    badge: string
    USD: string
    EUR: string
    GBP: string
  }
  popup: PopupType
}

export type SingleImage = {
  image: ImageAsset
}

export type TwoColumnImage = {
  leftImage: ImageAsset
  rightImage: ImageAsset
}

export type TextBlock = {
  content: PortableTextBlock
  title: string
}

export type VideoBlock = {
  video: {
    asset: {
      playbackId: string
      assetId: string
      filename: string
    }
  }
}

type Module = SingleImage | TwoColumnImage | TextBlock | VideoBlock
export interface Work {
  _id: string
  title?: string
  slug?: {
    current?: string
  }
  _type: string
  subtitle?: string
  thumbnailImage?: ImageAsset
  linkTitle?: string
  caseStudyType?: string
  type?: string
  roles?: string[]
  year?: number
  modules?: Module[]
  nextProject?: Work
  metaDescription?: string
  metaTitle?: string
  metaKeywords?: string[]
  ogImage?: string
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}

export interface Testimonial {
  name: string
  role: string
  content: PortableTextBlock
  image: ImageAsset
  _type: string
}

export interface GlobalSettings {
  footerTitle: string
}
