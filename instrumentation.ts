export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only register instrumentation in Node.js environment
    // This prevents the 'self is not defined' error in edge runtime
    try {
      await import('@opentelemetry/sdk-node');
      // Add any OpenTelemetry initialization code here
    } catch (e) {
      console.error('Error initializing OpenTelemetry:', e);
    }
  }
} 