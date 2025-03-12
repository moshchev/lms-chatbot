import { createFetch } from '@vercel/fetch';
import { createServer } from '@vercel/node';
import { createPagesFunctionHandler } from '@cloudflare/next-on-pages';

// Create a custom fetch function that includes the necessary headers
const customFetch = createFetch({
  userAgent: 'Cloudflare-Workers',
});

// Create a handler for the Pages Function
export const onRequest = createPagesFunctionHandler({
  // Provide the path to the Next.js app build output directory
  dir: '.next',
  // Use the custom fetch function
  fetch: customFetch,
}); 