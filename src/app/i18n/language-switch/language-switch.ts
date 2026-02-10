import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from '../language.service';
import { Language } from '../../models/types';

@Component({
  selector: 'app-language-switch',
  imports: [],
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.css',
})
export class LanguageSwitch {
  @Input() className =
    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all font-mono text-sm text-muted-foreground hover:text-primary';

  @Input() show: 'current' | 'next' = 'current';

  @Output() changed = new EventEmitter<Language>();

  constructor(public lang: LanguageService) {}

  get label(): string {
    const current = this.lang.language();
    if (this.show === 'current') return current.toUpperCase();
    return (current === 'ro' ? 'EN' : 'RO');
  }

  async toggle(): Promise<void> {
    const next: Language = this.lang.language() === 'ro' ? 'en' : 'ro';
    await this.lang.setLanguage(next);
    this.changed.emit(next);
  }
}
