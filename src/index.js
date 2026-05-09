export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route for the contact form submission
    if (url.pathname === '/submit' || url.pathname === '/functions/submit.js') {
      const { onRequest } = await import('../functions/submit.js');
      // Bridge between Worker fetch and Pages onRequest
      return onRequest({
        request: request,
        env: env,
        params: {},
        waitUntil: ctx.waitUntil.bind(ctx),
        next: () => env.ASSETS.fetch(request),
        data: {},
      });
    }

    // Route for the test function
    if (url.pathname === '/test' || url.pathname === '/functions/test.js') {
      const { onRequest } = await import('../functions/test.js');
      return onRequest({
        request: request,
        env: env,
        params: {},
        waitUntil: ctx.waitUntil.bind(ctx),
        next: () => env.ASSETS.fetch(request),
        data: {},
      });
    }

    // Fallback to static assets in the public/ folder
    return env.ASSETS.fetch(request);
  }
};
