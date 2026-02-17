import { Injectable } from '@angular/core';

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honey?: string; // honeypot anti-spam
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {
   async send(payload: ContactPayload): Promise<void> {
    const res = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(txt || 'Failed to send email');
    }
  }
}
