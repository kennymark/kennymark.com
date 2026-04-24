import redirects from '../../lib/redirects.js';
import slugify from '../../lib/slug';
import { skillTypes } from '../data/data';
import { extraProjects, mainProjects, topProjects } from '../data/projects';

export const skills = skillTypes;
export const homepageProjects = mainProjects;
export const portfolioProjects = topProjects;
export const moreProjects = extraProjects;
export const shortlinks = redirects;

export const allProjects = [...topProjects, ...extraProjects];

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => slugify(project.name) === slug);
}
