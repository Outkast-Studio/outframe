import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepagSettings',
  title: 'Homepage Settings',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'logoCloud',
      title: 'Logo Cloud',
      type: 'array',
      of: [
        {
          type: 'image',
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
        },
      ],
    }),
  ],
})
