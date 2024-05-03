import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import author from './author'
import post from './post'
import settings from './settings'
import work from './work'
import homepageSettings from './homepageSettings'
import testimonial from './testimonial'
import recentWork from './recentWork'
import {
  singleImage,
  textBlock,
  twoColumnImage,
  testimonialBlock,
} from './work'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    author,
    post,
    settings,
    work,
    homepageSettings,
    testimonial,
    singleImage,
    textBlock,
    twoColumnImage,
    testimonialBlock,
    recentWork,
  ],
}
