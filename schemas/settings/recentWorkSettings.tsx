import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recentWorkSettings',
  title: 'Recent Work Settings',
  icon: ImagesIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'recentWork',
      title: 'Recent Work',
      type: 'array',
      of: [
        {
          name: 'recentWork',
          title: 'Recent Work Item',
          type: 'reference',
          to: [{ type: 'recentWork' }],
        },
      ],
    }),
  ],
})
