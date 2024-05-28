import { EarthGlobeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  icon: EarthGlobeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'footerTitle',
      title: 'Footer Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
