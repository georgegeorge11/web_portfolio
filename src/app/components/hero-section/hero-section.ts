import { ChangeDetectorRef, Component, effect, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../i18n/language.service';
import { TPipe } from '../../i18n/t-pipe';
import { Token } from '../../models/types';
import { Helpers } from '../../utils/helpers';


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, TPipe],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
})
export class HeroSection implements OnInit, OnDestroy {
  renderedLines: Token[][] = [];

  currentLineIndex = 0;
  currentCharIndex = 0;

  private timer: number | null = null;

  private readonly charDelayMs = 100;
  private readonly lineDelayMs = 400;
  private readonly restartDelayMs = 1800;

  constructor(
    public lang: LanguageService,
    private cdr: ChangeDetectorRef,
    private helpers: Helpers
  ) {
    effect(() => {
      this.lang.language();
      this.resetTyping();
      this.startTyping();
    });
  }

  ngOnInit(): void {
    this.resetTyping();
    this.startTyping();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get codeLines(): string[] {
    const language = this.lang.language();
    const passion = language === 'ro' ? 'Building awesome apps' : 'Building awesome apps';

    return [
      'const developer: FullStackDeveloper = {',
      '  name: "George Panfil",',
      '  stack: ["Angular", ".NET Core"],',
      `  passion: '${passion}'`,
      '};',
    ];
  }

  get isTyping(): boolean {
    return this.currentLineIndex < this.codeLines.length;
  }

  private resetTyping(): void {
    this.clearTimer();
    this.renderedLines = [];
    this.currentLineIndex = 0;
    this.currentCharIndex = 0;

    this.cdr.detectChanges();
  }

  private startTyping(): void {
    this.tick();
  }

  private tick(): void {
    this.clearTimer();

    const lines = this.codeLines;

    if (this.currentLineIndex >= lines.length) {
      this.timer = window.setTimeout(() => {
        this.resetTyping();
        this.startTyping();
      }, this.restartDelayMs);
      return;
    }

    const fullLine = lines[this.currentLineIndex];
    const tokens = this.tokenizeLine(fullLine);
    const totalChars = tokens.reduce((sum, t) => sum + t.text.length, 0);

    if (this.currentCharIndex <= totalChars) {
      if (!this.renderedLines[this.currentLineIndex]) {
        this.renderedLines[this.currentLineIndex] = [];
      }

      this.renderedLines[this.currentLineIndex] = this.sliceTokens(tokens, this.currentCharIndex);
      this.cdr.detectChanges();

      this.currentCharIndex++;

      this.cdr.detectChanges();

      this.timer = window.setTimeout(() => this.tick(), this.charDelayMs);
      return;
    }

    this.currentLineIndex++;
    this.currentCharIndex = 0;

    this.cdr.detectChanges();

    this.timer = window.setTimeout(() => this.tick(), this.lineDelayMs);
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
  private tokenizeLine(line: string): Token[] {
    const out: Token[] = [];

    const re = /(".*?"|'.*?')/g;
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = re.exec(line)) !== null) {
      const before = line.slice(last, m.index);
      if (before) out.push(...this.tokenizeNonString(before));

      out.push({ text: m[0], cls: 'text-green-400' });

      last = m.index + m[0].length;
    }

    const tail = line.slice(last);
    if (tail) out.push(...this.tokenizeNonString(tail));

    return out;
  }

  private tokenizeNonString(part: string): Token[] {
    const out: Token[] = [];

    const chunks = part.split(/(\s+|=|\{|\}|:|,|\[|\]|\(|\)|;)/).filter((c) => c !== '');

    for (const c of chunks) {
      if (c === 'const') out.push({ text: c, cls: 'text-accent' });
      else if (c === 'developer') out.push({ text: c, cls: 'text-blue-400' });
      else if (c === 'FullStackDeveloper') out.push({ text: c, cls: 'text-blue-500' });
      else out.push({ text: c, cls: 'text-muted-foreground' });
    }

    return out;
  }

  private sliceTokens(tokens: Token[], charCount: number): Token[] {
    if (charCount <= 0) return [];

    const out: Token[] = [];
    let remaining = charCount;

    for (const t of tokens) {
      if (remaining <= 0) break;

      if (t.text.length <= remaining) {
        out.push(t);
        remaining -= t.text.length;
      } else {
        out.push({ text: t.text.slice(0, remaining), cls: t.cls });
        remaining = 0;
      }
    }

    return out;
  }

  downloadCV(): void {
    this.helpers.downloadFile();
  }
}
