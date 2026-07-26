import { type SchemaTypeDefinition } from 'sanity';
import { product } from './schemas/product';
import { contactSettings } from './schemas/contactSettings';
import { category } from './schemas/category';
import { series } from './schemas/series';
import { videoPage } from './schemas/videoPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, series, contactSettings, videoPage],
};
