import { defineType, defineField } from 'sanity';

// Категория портфолио (например: Свадьбы, Портреты, Семья).
export const category = defineType({
  name: 'category',
  title: 'Portfolio category',
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
      name: 'order',
      title: 'Order (sort, smaller = first)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'description',
      title: 'Description (per language)',
      type: 'localizedText',
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
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'coverPhoto' },
  },
});
