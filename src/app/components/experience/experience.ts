import { Component, inject } from '@angular/core';
import { ExpBlock, ExperienceType } from '../../models/experience';
import { CommonModule } from '@angular/common';
import { TPipe } from '../../i18n/t-pipe';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, TPipe],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  lang = inject(LanguageService);

  experiences: ExperienceType[] = [
    {
      roleKey: 'exp.0.role',
      company: 'exp.0.company',
      locationKey: 'exp.0.location',
      periodKey: 'exp.0.period',
      type: 'Full-time',
      descKey: 'exp.0.desc',
      responsibilitiesObjKey: 'exp.0.resp',
      technologies: ['Angular 20', 'Spring Boot', 'PostgreSQL', 'Docker'],
    },
    {
      roleKey: 'exp.1.role',
      company: 'exp.1.company',
      locationKey: 'exp.1.location',
      periodKey: 'exp.1.period',
      type: 'Full-time',
      descKey: 'exp.1.desc',
      responsibilitiesObjKey: 'exp.1.resp',
      technologies: ['Angular 17', '.NET Core', 'SQL Server'],
    },
    {
      roleKey: 'exp.2.role',
      company: 'exp.2.company',
      locationKey: 'exp.2.location',
      periodKey: 'exp.2.period',
      type: 'Internship',
      descKey: 'exp.2.desc',
      responsibilitiesObjKey: 'exp.2.resp',
      technologies: ['Angular 15', '.NET Core', 'SQL Server'],
    }
  ];

  badgeOutline =
    'px-3 py-1 rounded-md border border-border text-xs font-mono text-muted-foreground';
  badgeType =
    'px-3 py-1 rounded-md border text-xs font-mono bg-primary/10 text-primary border-primary/30';
  techBadge = 'px-3 py-1.5 rounded-md text-xs font-mono bg-secondary/50';

  getBlocks(exp: ExperienceType): ExpBlock[] {
    const raw = this.lang.getRaw(exp.responsibilitiesObjKey);

    if (!Array.isArray(raw)) return [];

    return raw
      .map((block: any) => {
        const title =
          typeof block?.title === 'string' && block.title.trim().length
            ? block.title.trim()
            : undefined;

        const bullets = Array.isArray(block?.bullets)
          ? block.bullets.map((b: any) => String(b)).filter((b: string) => b.trim().length > 0)
          : [];

        return { title, bullets };
      })
      .filter((b) => b.title || b.bullets.length);
  }
}
