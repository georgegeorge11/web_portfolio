import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../theme/theme';
import { LanguageSwitch } from '../../i18n/language-switch/language-switch';
import { TPipe } from '../../i18n/t-pipe';


@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, Theme, LanguageSwitch, TPipe],
  templateUrl: './preferences.html',
})
export class Preferences{
  isOpen = false;

  @Output() changed = new EventEmitter<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  stop(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // oprește și alți listeneri pe același element, dacă există
    (event as any).stopImmediatePropagation?.();
  }

  toggleMenu(event: Event): void {
    this.stop(event);
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  handleChanged(): void {
    this.closeMenu();
    this.changed.emit();
  }

  @HostListener('document:pointerdown', ['$event'])
  onOutsidePointerDown(ev: PointerEvent): void {
    if (!this.isOpen) return;
    if (!this.el.nativeElement.contains(ev.target as Node)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeMenu();
  }
}
