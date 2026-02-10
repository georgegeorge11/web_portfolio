import { Component, HostListener, inject, signal } from '@angular/core';
import { TPipe } from '../../i18n/t-pipe';
import { CommonModule } from '@angular/common';
import { NavLink } from '../../models/types';
import { Preferences } from '../preferences/preferences';
import { Theme } from '../theme/theme';
import { LanguageSwitch } from '../../i18n/language-switch/language-switch';
import { Helpers } from '../../utils/helpers';

@Component({
  selector: 'app-navbar',
  imports: [TPipe, CommonModule, Preferences, Theme, LanguageSwitch],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  helper = inject(Helpers);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  readonly navLinks: NavLink[] = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.projects', href: '#portfolio' },
    { key: 'nav.education', href: '#education' },
    { key: 'nav.contact', href: '#contact' },
  ];

  

  ngOnInit(): void {
    this.onScroll();
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }
  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    console.log(this.isMobileMenuOpen());
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }


  downloadCV(): void {
    this.helper.downloadFile();
  }
}
