export async function onRequestPost(context) {
  try {
    const data = await context.request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject') || 'New Contact Form Submission';
    const message = data.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Prepare email via MailChannels (Free for Cloudflare Pages)
    const send_request = new Request('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ 
                email: 'grace@parklanemethodist.org.uk', 
                name: 'Grace @ Park Lane Methodist' 
            }],
          },
        ],
        from: {
          email: 'no-reply@parklanemethodist.org.uk',
          name: 'Church Website Form',
        },
        subject: `[Website Contact] ${subject}`,
        content: [
          {
            type: 'text/plain',
            value: `New message from church website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          },
        ],
      }),
    });

    const res = await fetch(send_request);
    
    if (res.ok) {
        // Redirect back to contact page with a success flag
        return Response.redirect(new URL('/contact.html?success=true', context.request.url), 303);
    } else {
        const respText = await res.text();
        return new Response(`MailChannels Error: ${respText}`, { status: 500 });
    }
  } catch (err) {
    return new Response(`Internal Server Error: ${err.message}`, { status: 500 });
  }
}
