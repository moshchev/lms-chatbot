/** @type {import('@cloudflare/next-on-pages').NextOnPagesConfig} */
module.exports = {
  // Customize how your app is deployed to Cloudflare Pages
  experimental: {
    // Enable streaming responses
    streamingFunctions: true,
    // Optimize the build output
    optimizeBuilds: true,
    // Skip validation of runtime
    skipValidation: false,
  },
  // Configure the build output
  buildOutputDirectory: '.next',
  // Configure the functions directory
  functionsDirectory: 'functions',
  // Ensure all routes use the Edge Runtime
  edgeFunctionRoutes: {
    // Include all API routes
    include: ['/api/**/*'],
  },
}; 