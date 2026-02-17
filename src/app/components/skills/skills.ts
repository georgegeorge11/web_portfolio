import { Component } from '@angular/core';
import { Category, Skill } from '../../models/skills';
import { CommonModule } from '@angular/common';
import { TPipe } from '../../i18n/t-pipe';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, TPipe],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  techStack = [
    { name: 'Angular', icon: '🅰️' },
    { name: '.NET Core', icon: '💜' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'C#', icon: '🔷' },
    { name: 'SQL Server', icon: '🗄️' },
    { name: 'Git', icon: '📦' },
  ];

  categories: Category[] = [
    {
      iconClass: 'fa-solid fa-layer-group',
      titleKey: 'skills.frontend',
      gradientClass: 'from-primary to-primary/50',
      skills: [
        { name: 'Angular', level: 'Advanced', yearsKey: 'years.2' },
        { name: 'TypeScript', level: 'Advanced', yearsKey: 'years.2' },
        { name: 'RxJS', level: 'Basic', yearsKey: 'years.1' },
        { name: 'Tailwind', level: 'Intermediate', yearsKey: 'years.1' },
        { name: 'Angular Material', level: 'Advanced', yearsKey: 'years.2' },
      ],
    },
    {
      iconClass: 'fa-solid fa-server',
      titleKey: 'skills.backend',
      gradientClass: 'from-accent to-accent/50',
      skills: [
        { name: '.NET Core 8', level: 'Advanced', yearsKey: 'years.2' },
        { name: 'C#', level: 'Advanced', yearsKey: 'years.2' },
        { name: 'Entity Framework', level: 'Advanced', yearsKey: 'years.1.5' },
        { name: 'REST APIs', level: 'Expert', yearsKey: 'years.2' },
        { name: 'SignalR', level: 'Intermediate', yearsKey: 'years.1' },
      ],
    },
    {
      iconClass: 'fa-solid fa-database',
      titleKey: 'skills.database',
      gradientClass: 'from-green-500 to-green-500/50',
      skills: [
        { name: 'SQL Server', level: 'Intermediate', yearsKey: 'years.2' },
        { name: 'PostgreSQL', level: 'Intermediate', yearsKey: 'years.1' },
        { name: 'MongoDB', level: 'Basic', yearsKey: 'years.0.5' },
      ],
    },
    {
      iconClass: 'fa-solid fa-cloud',
      titleKey: 'skills.devops',
      gradientClass: 'from-orange-500 to-orange-500/50',
      skills: [
        { name: 'Docker', level: 'Basic', yearsKey: 'years.0.5' },
        { name: 'Git', level: 'Advanced', yearsKey: 'years.2' },
      ],
    },
  ];

  tools = ['VS Code', 'Visual Studio','SQL Server Management Studio', 'Postman', 'Jira', 'Swagger'];

  getLevelClasses(level: Skill['level']): string {
    switch (level) {
      case 'Expert':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'Advanced':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  }
}
