export type ExpBlock = {
  title?: string;
  bullets: string[];
};

export interface ExperienceType {
  roleKey: string;
  company: string;
  locationKey: string;
  periodKey: string;
  type: string;
  descKey: string;
  responsibilitiesObjKey: string;
  technologies: string[];
}