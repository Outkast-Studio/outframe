import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recentWork',
  title: 'Recent Work',
  icon: ImagesIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description:
            "Describe what's in the image for screen readers and search engines.",
          validation: (Rule: any) => Rule.required(),
        },
      ],
      options: { hotspot: true },
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      description: 'The number of columns the image should span on desktop',
      options: {
        list: [
          { value: 2, title: '2 Column' },
          { value: 3, title: '3 Column' },
          { value: 4, title: '4 Column' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'number',
      description: 'The alignment of the image in the grid',
      options: {
        list: [
          { value: 1, title: 'Top' },
          { value: 2, title: 'Center' },
          { value: 3, title: 'Bottom' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      return { ...selection }
    },
  },
})
