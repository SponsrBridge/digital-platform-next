import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';

export const isSanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-01-01',
    })
  : null;

export function urlFor(source: any) {
  if (!sanityClient) return null;
  return imageUrlBuilder(sanityClient).image(source);
}
