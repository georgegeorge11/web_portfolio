export class EducationItem {
  degreeKey: string;
  institutionKey: string;
  period: string;
  descriptionKey: string;
  highlightsKeys: string[];

  constructor() {
    this.degreeKey = '';
    this.institutionKey = '';
    this.period = '';
    this.descriptionKey = '';
    this.highlightsKeys = [];
  }
}


export type LearningItem = {
  name: string;
  progress: number;
};
