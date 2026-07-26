import { defineType, defineField, defineArrayMember } from 'sanity';

const videoItem = defineArrayMember({
  type: 'object',
  name: 'videoItem',
  fields: [
    {
      name: 'title',
      title: 'Title (optional, not shown on page — for Studio only)',
      type: 'string',
    },
    {
      name: 'poster',
      title: 'Poster image (shown before play)',
      type: 'image',
      options: { hotspot: true },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'videoFile',
      title: 'Video file (upload MP4)',
      type: 'file',
      options: { accept: 'video/*' },
    },
    {
      name: 'videoUrl',
      title: 'Or video URL (direct .mp4 / YouTube / Vimeo)',
      type: 'url',
    },
  ],
  preview: {
    select: { title: 'title', media: 'poster' },
    prepare: ({ title, media }) => ({
      title: (title as string) || 'Video',
      media,
    }),
  },
});

export const videoPage = defineType({
  name: 'videoPage',
  title: 'Video page',
  type: 'document',
  groups: [
    { name: 'intro', title: '1. Intro (text + photo)' },
    { name: 'second', title: '2. Second block (photo + text)' },
    { name: 'films', title: '3. Films' },
    { name: 'teasers', title: '4. Teasers' },
  ],
  fields: [
    defineField({
      name: 'introTitle',
      title: 'Intro title (e.g. reut_movie)',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'introText',
      title: 'Intro text (per language)',
      type: 'localizedText',
      group: 'intro',
    }),
    defineField({
      name: 'introImage',
      title: 'Intro photo (right side)',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
    }),
    defineField({
      name: 'secondText',
      title: 'Second block text (per language)',
      type: 'localizedText',
      group: 'second',
    }),
    defineField({
      name: 'secondImage',
      title: 'Second block photo (left side)',
      type: 'image',
      options: { hotspot: true },
      group: 'second',
    }),
    defineField({
      name: 'filmsTitle',
      title: 'Films section title (empty = default translation)',
      type: 'string',
      group: 'films',
    }),
    defineField({
      name: 'films',
      title: 'Films',
      type: 'array',
      of: [videoItem],
      group: 'films',
    }),
    defineField({
      name: 'teasersTitle',
      title: 'Teasers section title (empty = default translation)',
      type: 'string',
      group: 'teasers',
    }),
    defineField({
      name: 'teasers',
      title: 'Teasers',
      type: 'array',
      of: [videoItem],
      group: 'teasers',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Video page' }),
  },
});
