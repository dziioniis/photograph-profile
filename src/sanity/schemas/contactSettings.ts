import { defineType, defineField, defineArrayMember } from 'sanity';

// Singleton-документ с настройками страницы "Контакты".
// Заголовки/подписи секций остаются в переводах (UI), здесь — сами значения.
export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL (for "Contact on Instagram" button)',
      type: 'url',
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'social',
          fields: [
            {
              name: 'label',
              title: 'Label (short, shown in circle, e.g. IG)',
              type: 'string',
              validation: (rule) => rule.required().max(4),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            },
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact page' }),
  },
});
