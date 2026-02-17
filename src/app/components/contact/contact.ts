import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TPipe } from '../../i18n/t-pipe';
import { ContactInfo, SocialLink } from '../../models/contact-info';
import { ContactService } from '../../core/contact-service';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honey: string; // honeypot anti-spam
};

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, TPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  constructor(private contactService: ContactService) {}

  isSubmitting = false;

  formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    honey: '',
  };

  socialLinks: SocialLink[] = [
    {
      icon: 'fa-brands fa-github',
      label: 'GitHub',
      href: 'https://github.com/georgegeorge11',
      username: '@georgegeorge11',
    },
    {
      icon: 'fa-brands fa-linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/george-panfil-218125242/',
      username: '/in/george-panfil-218125242',
    },
  ];

  get contactInfo(): ContactInfo[] {
    return [
      {
        icon: 'fa-solid fa-envelope',
        label: 'Email',
        value: 'georgepanfil87@gmail.com',
        href: 'mailto:georgepanfil87@gmail.com',
      },
      {
        icon: 'fa-solid fa-location-dot',
        label: 'contact.locationLabel',
        value: 'contact.location',
        href: null,
      },
    ];
  }

  async submit(form: NgForm): Promise<void> {
    if (this.isSubmitting || form.invalid) return;

    this.isSubmitting = true;

    try {
      await this.contactService.send({
        name: this.formData.name,
        email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message,
        honey: this.formData.honey,
      });

      this.formData = { name: '', email: '', subject: '', message: '', honey: '' };
      form.resetForm(this.formData);

      // aici poți integra toast success dacă ai
    } catch (e) {
      console.error(e);
      // aici toast error dacă vrei
    } finally {
      this.isSubmitting = false;
    }
  }
}
