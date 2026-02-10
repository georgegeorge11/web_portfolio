export class ContactInfo  {
  icon: string;
  label: string;
  value: string;
  href?: string | null;

  constructor(){
    this.icon = '';
    this.label = '';
    this.value = '';
    this.href = null;
  }
};

export class SocialLink  {
  icon: string;
  label: string;
  href: string;
  username: string;

  constructor(){
    this.icon = '';
    this.label = '';
    this.href = '';
    this.username = '';
  }
};
