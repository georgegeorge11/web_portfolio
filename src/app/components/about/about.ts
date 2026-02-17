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

}
