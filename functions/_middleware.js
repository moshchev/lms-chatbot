// Set compatibility flags
export const config = {
  compatibility_date: "2023-06-28",
  compatibility_flags: ["nodejs_compat"]
};

import { createPagesFunctionHandler } from '@cloudflare/next-on-pages';

// Create a handler for the Pages Function
export const onRequest = createPagesFunctionHandler({
  // Provide the path to the Next.js app build output directory
  dir: '.',
}); 