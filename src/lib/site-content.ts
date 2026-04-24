import redirects from '../../lib/redirects.js';
import slugify from '../../lib/slug';
import { skillTypes } from '../data/data';
import { extraProjects, mainProjects, topProjects } from '../data/projects';

export type SiteProject = {
  name: string;
  status?: string;
  company?: string;
  description: string;
  image: string;
  gallery?: string[];
  link?: string | null;
  source?: string | null;
  showCase?: boolean;
  stack?: string[];
  color?: string;
  tag?: string;
};

export const skills = skillTypes;
export const homepageProjects = mainProjects;
export const portfolioProjects = topProjects;
export const shortlinks = redirects;

const allProjects = [...topProjects, ...extraProjects] as SiteProject[];

export function getProjectBySlug(slug: string): SiteProject | undefined {
  return allProjects.find((project) => slugify(project.name) === slug);
}
