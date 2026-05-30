import { type SchemaTypeDefinition } from 'sanity';
import { product } from './schemas/product';
import { contactSettings } from './schemas/contactSettings';
import { category } from './schemas/category';
import { series } from './schemas/series';

// Studio: товары, портфолио (категории + серии), настройки контактов.
// Отзывы добавим следующим этапом.
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, series, contactSettings],
};
