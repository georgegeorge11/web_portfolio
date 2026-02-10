export class Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Basic';
  yearsKey: string;

  constructor() {
    this.name = '';
    this.level = 'Basic';
    this.yearsKey = '';
  }
}
export class Category {
  iconClass: string;
  titleKey: string;
  gradientClass: string;
  skills: Skill[];

  constructor() {
    this.iconClass = '';
    this.titleKey = '';
    this.gradientClass = '';
    this.skills = [];
  }
}
