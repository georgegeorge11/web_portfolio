import type { Handler } from '@netlify/functions';

type Payload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honey?: string;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}') as Partial<Payload>;

    // Honeypot: dacă e completat, e bot => return ok fără să trimită email
    if ((data.honey || '').trim().length > 0) {
      return json(200, { ok: true });
    }

    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const subject = (data.subject || '').trim();
    const message = (data.message || '').trim();

    if (!name || !email || !message) return json(400, { error: 'Missing required fields' });
    if (!isValidEmail(email)) return json(400, { error: 'Invalid email' });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return json(500, { error: 'Missing RESEND_API_KEY env var' });

    const to = 'georgepanfil87@gmail.com';
    const from = 'Portfolio <onboarding@resend.dev>'; // schimbă după ce verifici domeniul

    const finalSubject = subject
      ? `${subject} — ${name}`
      : `[New message — ${name}`;

    const html = `
      <h2>New portfolio message</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: finalSubject,
        html,
        reply_to: email, // reply direct recruiter-ului
      }),
    });

    if (!resp.ok) {
      const details = await resp.text();
      return json(502, { error: 'Resend error', details });
    }

    return json(200, { ok: true });
  } catch {
    return json(500, { error: 'Server error' });
  }
};

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
