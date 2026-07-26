import { groq } from 'next-sanity';
import { sanityClient } from '@/lib/sanity';
import type { ContactSettings } from '@/types/models';

// Значения по умолчанию — пока фотограф не заполнил документ в Studio.
const DEFAULT_CONTACT: ContactSettings = {
  email: 'contact@photographer.com',
  location: 'New York, NY',
  instagram: 'https://instagram.com',
  socials: [
    { label: 'IG', url: 'https://instagram.com' },
    { label: 'FB', url: 'https://facebook.com' },
    { label: 'YT', url: 'https://youtube.com' },
  ],
};

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    const data = await sanityClient.fetch<ContactSettings | null>(
      groq`*[_type == "contactSettings"][0]{
        email,
        location,
        instagram,
        "socials": socials[]{ label, url }
      }`
    );
    if (!data) return DEFAULT_CONTACT;
    return {
      email: data.email || DEFAULT_CONTACT.email,
      location: data.location || DEFAULT_CONTACT.location,
      instagram: data.instagram || DEFAULT_CONTACT.instagram,
      socials: data.socials?.length ? data.socials : DEFAULT_CONTACT.socials,
    };
  } catch (error) {
    console.error('Sanity getContactSettings failed:', error);
    return DEFAULT_CONTACT;
  }
}
