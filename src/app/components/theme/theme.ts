import { Component, Input } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.html',
  styleUrl: './theme.css',
})
export class Theme {
 @Input() className =
    'flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all text-muted-foreground hover:text-primary';

  constructor(public theme: ThemeService) {}
}
