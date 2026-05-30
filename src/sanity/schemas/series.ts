import { defineType, defineField, defineArrayMember } from 'sanity';

// Серия (фотосессия) внутри категории портфолио.
export const series = defineType({
  name: 'series',
  title: 'Portfolio series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order (sort, smaller = first)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
    }),
    defineField({
      name: 'coverPhoto',
      title: 'Cover photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt text (for SEO/accessibility)',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'protect',
              title: 'Protect from download',
              type: 'boolean',
              initialValue: true,
            },
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'videoPreviewUrl',
      title: 'Video preview URL (optional)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'coverPhoto' },
  },
});
