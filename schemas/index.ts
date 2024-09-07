import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import author from './author'
import post from './post'
import settings from './settings'
import work from './work'
import homepageSettings from './homepageSettings'
import testimonial from './testimonial'
import recentWork from './recentWork'
import recentWorkSettings from './settings/recentWorkSettings'
import globalSettings from './globalSettings'

import { popup } from './popup'
import {
  singleImage,
  textBlock,
  twoColumnImage,
  testimonialBlock,
  videoBlock,
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
    videoBlock,
    recentWork,
    recentWorkSettings,
    globalSettings,
    popup,
  ],
}
