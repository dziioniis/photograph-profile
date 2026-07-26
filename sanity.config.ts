'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './src/sanity/schema';
import { apiVersion, dataset, projectId } from './src/sanity/env';

// Встроенная Sanity Studio. Открывается по адресу /studio внутри этого же Next.js проекта.
export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      // "Контакты" — singleton (один документ), остальное (товары) — обычными списками.
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Contact page')
              .id('contactSettings')
              .child(
                S.document()
                  .schemaType('contactSettings')
                  .documentId('contactSettings')
              ),
            S.listItem()
              .title('Video page')
              .id('videoPage')
              .child(
                S.document().schemaType('videoPage').documentId('videoPage')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                item.getId() !== 'contactSettings' &&
                item.getId() !== 'videoPage'
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
