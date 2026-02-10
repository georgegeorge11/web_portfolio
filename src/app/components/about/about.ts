import { Component } from '@angular/core';
import { FunFact, ValueCard } from '../../models/about-me';
import { CommonModule } from '@angular/common';
import { TPipe } from '../../i18n/t-pipe';

@Component({
  selector: 'app-about',
  imports: [CommonModule, TPipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
values: ValueCard[] = [
    { iconClass: 'fa-solid fa-code', titleKey: 'about.cleanCode.title', descKey: 'about.cleanCode.desc' },
    { iconClass: 'fa-solid fa-rocket', titleKey: 'about.performance.title', descKey: 'about.performance.desc' },
    { iconClass: 'fa-solid fa-bullseye', titleKey: 'about.problemSolver.title', descKey: 'about.problemSolver.desc' },
  ];

  funFacts: FunFact[] = [
    { iconClass: 'fa-solid fa-mug-hot', labelKey: 'about.coffeesPerDay', value: '4+' },
    { iconClass: 'fa-solid fa-code', labelKey: 'about.commitsPerWeek', value: '50+' },
    { iconClass: 'fa-solid fa-gamepad', labelKey: 'about.sideProjects', value: '3' },
  ];
}
