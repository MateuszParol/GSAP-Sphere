import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// --- CONFIGURATION ---
// You need to create a project at https://www.sanity.io/manage
// and replace the projectId below.

export const client = createClient({
    projectId: '90u1xxaj', // Confirmed Project ID
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

// Helper to generate image URLs
const builder = createImageUrlBuilder(client);

export function urlFor(source) {
    if (!source) return undefined;
    return builder.image(source);
}
