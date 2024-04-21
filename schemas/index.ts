import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import author from './author'
import post from './post'
import settings from './settings'
import work from './work'
import homepageSettings from './homepageSettings'
import testimonial from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    author,
    post,
    settings,
    work,
    homepageSettings,
    testimonial,
  ],
}
