import { defineType, defineField, defineArrayMember } from 'sanity';

// Документ "Товар". Поля строго соответствуют типу Product из src/types/models.ts.
// Часть полей показывается в зависимости от типа товара (preset / online_course / physical),
// чтобы фотографу было понятно, что заполнять.
export const product = defineType({
  name: 'product',
  title: 'Product',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Preset (ZIP download)', value: 'preset' },
          { title: 'Online course', value: 'online_course' },
          { title: 'Physical kit', value: 'physical' },
        ],
        layout: 'radio',
      },
      initialValue: 'preset',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceCents',
      title: 'Price (in cents, e.g. 4900 = $49.00)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
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
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'beforeAfterImages',
      title: 'Before / After (presets)',
      type: 'array',
      hidden: ({ parent }) => parent?.type !== 'preset',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'beforeAfter',
          fields: [
            {
              name: 'before',
              title: 'Before',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
            },
            {
              name: 'after',
              title: 'After',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL (preset ZIP)',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'preset',
    }),
    defineField({
      name: 'videoPreviewUrl',
      title: 'Video preview URL (course)',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'online_course',
    }),
    defineField({
      name: 'modules',
      title: 'Course modules',
      type: 'array',
      hidden: ({ parent }) => parent?.type !== 'online_course',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'module',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'duration', title: 'Duration', type: 'string' },
            { name: 'videoUrl', title: 'Video URL', type: 'url' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'duration' },
          },
        }),
      ],
    }),
    defineField({
      name: 'instagramLink',
      title: 'Instagram order link (physical kit)',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'physical',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'images.0' },
  },
});
