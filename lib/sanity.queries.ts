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
  ${postFields}
}
`

export const workBySlugQuery = groq` 
*[_type == "work" && slug.current == $slug][0]
`

export const allWorkQuery = groq`
*[_type == "caseStudy"]  | order(date desc, _updatedAt desc)
`

export const workSlugsQuery = groq`
*[_type == "work" && defined(slug.current)][].slug.current
`

export const homepageQuery = groq`*[_type == 'homepageSettings'][0]{
  ...,
  logoCloud[] {
    asset,
    alt,
    "dimensions": asset->metadata.dimensions
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
  slug?: string
  content?: any
}

export type HomepageCaseStudies = (Work | Testimonial)[]

export interface HomepageSettings {
  logoCloud: ImageAsset[]
  heroCarousel: ImageAsset[]
  caseStudies: HomepageCaseStudies
  testimonials: Testimonial[]
}

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
