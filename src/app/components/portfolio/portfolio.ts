import { Component } from '@angular/core';
import { Project, ProjectCategory } from '../../models/portfolio';
import { CommonModule } from '@angular/common';
import { TPipe } from '../../i18n/t-pipe';
import { projects } from '../../utils/projects.data';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TPipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
categoryKeys = [
    'portfolio.all',
    'portfolio.fullStack',
    'portfolio.frontend',
    'portfolio.backend',
    'portfolio.openSource',
  ] as const;

  activeCategoryKey: (typeof this.categoryKeys)[number] = 'portfolio.all';

  // Map proiect -> key categorie (pentru filtrare)
  private categoryToKey: Record<ProjectCategory, (typeof this.categoryKeys)[number]> = {
    'Full Stack': 'portfolio.fullStack',
    Frontend: 'portfolio.frontend',
    Backend: 'portfolio.backend',
    'Open Source': 'portfolio.openSource',
  };

  projects: Project[] = projects;

  setCategory(key: (typeof this.categoryKeys)[number]) {
    this.activeCategoryKey = key;
  }

  get filteredProjects(): Project[] {
    if (this.activeCategoryKey === 'portfolio.all') return this.projects;

    return this.projects.filter((p) =>
      p.category.some((c) => this.categoryToKey[c] === this.activeCategoryKey),
    );
  }

  openUrl(url?: string) {
    if (!url || url === '#') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  typeBadgeClass(type: Project['type']): string {
    return type === 'Open Source'
      ? 'bg-accent/80 text-accent-foreground'
      : 'bg-primary/80 text-primary-foreground';
  }
}
