import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  icon: HomeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'heroCarousel',
      title: 'Hero Carousel',
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
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'The title for the hero section',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'heroTestimonial',
      title: 'Hero Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'logoCloud',
      title: 'Logo Cloud',
      type: 'array',
      of: [
        {
          name: 'svgIcon',
          title: 'SVG Icon',
          type: 'inlineSvg',
        },
      ],
    }),

    defineField({
      name: 'caseStudies',
      title: 'Case Studies Grid',
      type: 'array',
      description: 'Select the case studies to display on the homepage.',
      of: [
        {
          name: 'caseStudy',
          title: 'Case Study',
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
        {
          name: 'testimonial',
          title: 'Testimonial',
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description: 'Select the testimonials to display on the homepage.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
    }),
    defineField({
      name: 'dayRate',
      title: 'Day Rate',
      type: 'object',
      fields: [
        defineField({
          name: 'USD',
          title: 'Day rate in USD',
          type: 'string',
          description: 'The day rate in USD. Example $640',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'EUR',
          title: 'Day rate in EUR',
          type: 'string',
          description: 'The  day rate in EUR. Example €640',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'GBP',
          title: 'Day rate in GBP',
          type: 'string',
          description: 'The day rate in GBP. Example £640',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'flexPricing',
      title: '1st Pricing Block',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The title for the block',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'USD',
          title: 'Price in USD',
          type: 'string',
          description: 'The price in USD. Example $5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'EUR',
          title: 'Price in EUR',
          type: 'string',
          description: 'The price in EUR. Example €5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'GBP',
          title: 'Price in GBP',
          type: 'string',
          description: 'The price in USD. Example £5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'partTimePricing',
      title: '2nd Pricing Block',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The title for the block',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'USD',
          title: 'Price in USD',
          type: 'string',
          description: 'The price in USD. Example $5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'EUR',
          title: 'Price in EUR',
          type: 'string',
          description: 'The price in EUR. Example €5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'GBP',
          title: 'Price in GBP',
          type: 'string',
          description: 'The price in GBP. Example £5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'dedicatedPricing',
      title: '3rd Pricing Block',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'The title for the block',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'USD',
          title: 'Price in USD',
          type: 'string',
          description: 'The price in USD. Example $5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'EUR',
          title: 'Price in EUR',
          type: 'string',
          description: 'The price in EUR. Example €5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'GBP',
          title: 'Price in GBP',
          type: 'string',
          description: 'The price in GBP. Example £5,200/m',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    // defineField({
    //   name: 'dedicatedPricing',
    //   title: 'Dedicated Pricing',
    //   type: 'string',
    //   description: 'The price for the Dedicated plan',
    //   validation: (Rule: any) => Rule.required(),
    // }),
  ],
})
