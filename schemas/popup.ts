import { description, title } from 'lib/demo.data'

export const popup = {
  name: 'popup',
  title: 'Popup',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'A description of the image for accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'timer',
      title: 'Timer',
      type: 'number',
      description: 'Amount of seconds before popup should show',
      validation: (Rule) => Rule.required().positive().integer(),
    },
  ],
}

// TypeScript Type
