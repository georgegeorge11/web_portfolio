import { Project } from '../models/portfolio';

export const projects: Project[] = [
  {
    id: 1,
    titleKey: 'project.0.title',
    statusKey: 'project.0.status',
    descKey: 'project.0.desc',
    category: ['Full Stack'],
    technologies: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Docker', 'PyTorch'],
    features: [
      'project.0.feature.0',
      'project.0.feature.1',
      'project.0.feature.2',
      'project.0.feature.3',
      'project.0.feature.4',
      'project.0.feature.5',
    ],
    github: 'https://github.com/georgegeorge11/syntx',
    demo: '',
    type: 'Professional',
  },
  {
    id:2,
    titleKey: 'project.1.title',
    statusKey: 'project.1.status',
    descKey: 'project.1.desc',
    category: ['Frontend'],
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'i18n'],
    features: [
      'project.1.feature.0',
      'project.1.feature.1',
      'project.1.feature.2',
      'project.1.feature.3',
      'project.1.feature.4',
      'project.1.feature.5',
    ],
    github: 'https://github.com/georgegeorge11/web_portfolio',
    demo: 'https://georgepanfil.netlify.app/',
    type: 'Professional',
  }
];
