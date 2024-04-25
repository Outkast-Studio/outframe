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
  ${postFields}
}
`

export const workBySlugQuery = groq` 
*[_type == "caseStudy" && slug.current == $slug][0]{
  ...,
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
  logoCloud[] {
    asset,
    alt,
    "dimensions": asset->metadata.dimensions
  },
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
  workOgImage?: ImageAsset
  readTime?: number
  toc?: {
    text: string
  }[]
  suggestedArticles: Post[]
}

export type HomepageCaseStudies = (Work | Testimonial)[]

export interface HomepageSettings {
  logoCloud: ImageAsset[]
  heroCarousel: ImageAsset[]
  caseStudies: HomepageCaseStudies
  testimonials: Testimonial[]
  heroTestimonial: Testimonial
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

type Module = SingleImage | TwoColumnImage | TextBlock
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
