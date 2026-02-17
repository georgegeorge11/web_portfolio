import { Component } from '@angular/core';
import { EducationItem, LearningItem } from '../../models/education';
import { CommonModule } from '@angular/common';
import { TPipe } from '../../i18n/t-pipe';

@Component({
  selector: 'app-education',
  imports: [CommonModule, TPipe],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  education: EducationItem[] = [
    {
      degreeKey: 'edu.0.degree',
      institutionKey: 'edu.0.institution',
      period: 'edu.0.period',
      descriptionKey: 'edu.0.specialization',
      highlightsKeys: ['edu.0.gpa', 'edu.0.thesis'],
    },
    {
      degreeKey: 'edu.1.degree',
      institutionKey: 'edu.1.institution',
      period: 'edu.1.period',
      descriptionKey: 'edu.1.specialization',
      highlightsKeys: ['edu.1.gpa', 'edu.1.thesis'],
    },
  ];

  currentlyLearning: LearningItem[] = [
    { name: 'Angular', progress: 60 },
    { name: '.NET Core', progress: 45 },
    { name: 'Docker', progress: 30 },
    { name: 'Python', progress: 20 },

  ];

  openUrl(url?: string): void {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  badgeOutline =
    'px-3 py-1 rounded-md border border-border text-xs font-mono text-muted-foreground';
  badgeSecondary = 'px-3 py-1.5 rounded-md text-xs bg-secondary/50 text-foreground';
}
