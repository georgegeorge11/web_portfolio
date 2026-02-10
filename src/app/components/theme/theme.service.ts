import { Injectable, signal } from '@angular/core';
import { Theme } from '../../models/types';


const STORAGE_KEY = 'theme';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
   private readonly _theme = signal<Theme>(this.loadInitialTheme());
  readonly theme = this._theme.asReadonly();

  toggleTheme(): void {
    const next: Theme = this._theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    localStorage.setItem(STORAGE_KEY, theme);

    document.documentElement.classList.toggle('light', theme === 'light');
  }

  private loadInitialTheme(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme: Theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.classList.toggle('light', theme === 'light');
    return theme;
  }
}
