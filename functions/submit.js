export async function onRequest(context) {
  if (context.request.method === 'GET') {
    return new Response('Submit function is active and waiting for POST requests.', {
      headers: { 'content-type': 'text/plain' },
    });
  }
  return onRequestPost(context);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject') || 'New Contact Form Submission';
    const message = data.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Send email via Cloudflare's native Email Sending
    await env.EMAIL.send({
      from: "no-reply@parklanemethodist.org.uk",
      to: "grace@parklanemethodist.org.uk",
      subject: `[Website Contact] ${subject}`,
      text: `New message from church website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    // Redirect back to contact page with a success flag
    return Response.redirect(new URL('/contact.html?success=true', request.url), 303);
  } catch (err) {
    return new Response(`Email Error: ${err.message}`, { status: 500 });
  }
}

