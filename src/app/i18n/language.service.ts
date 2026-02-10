import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Dict, Language } from '../models/types';

const STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _lang = signal<Language>(this.loadInitialLanguage());
  private readonly _dict = signal<Dict>({});

  private readonly _cache = new Map<Language, Dict>();

  private _inflight: Promise<void> | null = null;
  private _targetLang: Language | null = null;

  readonly language = this._lang.asReadonly();

  constructor(private http: HttpClient) {
    void this.useLanguage(this._lang());
  }

  t(key: string): string {
    return this._dict()[key] ?? key;
  }

  async setLanguage(lang: Language): Promise<void> {
    await this.useLanguage(lang);
  }

  private async useLanguage(lang: Language): Promise<void> {
    if (lang === this._lang() && this._cache.has(lang)) {
      this._dict.set(this._cache.get(lang)!);
      return;
    }

    if (this._inflight) {
      this._targetLang = lang;
      await this._inflight;
      if (this._targetLang && this._targetLang !== this._lang()) {
        const next = this._targetLang;
        this._targetLang = null;
        await this.useLanguage(next);
      }
      return;
    }

    this._lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    const cached = this._cache.get(lang);
    if (cached) {
      this._dict.set(cached);
      return;
    }

    this._inflight = (async () => {
      try {
        const dict = await firstValueFrom(this.http.get<Dict>(`assets/i18n/${lang}.json`));
        this._cache.set(lang, dict);
        this._dict.set(dict);
      } catch (e) {
        console.error(`i18n: failed to load assets/i18n/${lang}.json`, e);

        const fallbackLang: Language = lang === 'ro' ? 'en' : 'ro';
        const fallback = this._cache.get(fallbackLang);
        this._dict.set(fallback ?? {});
      } finally {
        this._inflight = null;
      }
    })();

    await this._inflight;
  }

  private loadInitialLanguage(): Language {
    const saved = localStorage.getItem(STORAGE_KEY);
    const lang: Language = saved === 'en' ? 'en' : 'ro';
    document.documentElement.lang = lang;
    return lang;
  }
}
