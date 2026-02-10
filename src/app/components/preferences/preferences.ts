import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Theme } from '../theme/theme';
import { LanguageSwitch } from '../../i18n/language-switch/language-switch';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preferences',
  imports: [Theme, LanguageSwitch, CommonModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.css',
})
export class Preferences {
 isOpen = false;

  @Output() changed = new EventEmitter<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent): void {
    if (!this.isOpen) return;
    const target = ev.target as Node | null;
    if (target && !this.el.nativeElement.contains(target)) this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeMenu();
  }

  handleChanged(): void {
    this.changed.emit();
  }
}
