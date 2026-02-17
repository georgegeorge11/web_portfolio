export type ProjectCategory = 'Full Stack' | 'Frontend' | 'Backend' | 'Open Source';

export type Project = {
  id: number;
  titleKey: string;
  statusKey: string;
  descKey: string;
  category: ProjectCategory[];
  technologies: string[];
  features: string[];
  image?: string;
  github?: string;
  demo?: string;
  stars?: number;
  type: 'Professional' | 'Open Source';
};
