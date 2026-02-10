import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TPipe } from '../../i18n/t-pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactInfo, SocialLink } from '../../models/contact-info';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, TPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  isSubmitting = false;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // constructor(private toast: ToastService) {}

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

    await new Promise<void>((r) => window.setTimeout(r, 1000));

    // this.toast.show({
    //   title: this.t('contact.toastTitle'),
    //   description: this.t('contact.toastDesc'),
    // });

    this.formData = { name: '', email: '', subject: '', message: '' };
    form.resetForm(this.formData);

    this.isSubmitting = false;
  }

  private t(key: string): string {
    // fallback: dacă nu ai injectat LanguageService aici, lasă toast-ul cu cheile
    // Recomandat: injectează LanguageService și returnează this.lang.t(key).
    return key;
  }
}
