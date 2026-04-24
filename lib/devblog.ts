import axios, { type AxiosResponse } from 'axios';
import type { IArticle } from 'models/IArticle';

import { sanitizeDevToMarkdown } from './markdown';

const username = 'kennymark';
const blogURL = 'https://kennymark.com/blog/';
const portfolioURL = 'https://wallis.dev/portfolio/';

type DevToArticle = {
  id: number;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  positive_reactions_count: number;
  cover_image: string;
  tag_list: string[];
  canonical_url: string;
  page_views_count?: number;
  collection_id?: number;
  user?: Record<string, unknown>;
  body_markdown: string;
};

// Takes a URL and returns the relative slug to your website
const convertCanonicalURLToRelative = (canonical: string) => {
  if (canonical.startsWith(portfolioURL)) {
    return canonical.replace(portfolioURL, '');
  }
  return canonical.replace(blogURL, '');
};

const convertDevtoResponseToArticle = (data: DevToArticle): IArticle => {
  const slug = convertCanonicalURLToRelative(data.canonical_url);
  const markdown = sanitizeDevToMarkdown(data.body_markdown);

  const article: IArticle = {
    id: data.id,
    title: data.title,
    description: data.description,
    publishedAt: data.published_at,
    devToSlug: data.slug,
    devToPath: data.path,
    devToURL: data.url,
    commentsCount: data.comments_count,
    publicReactionsCount: data.public_reactions_count,
    positiveReactionsCount: data.positive_reactions_count,
    coverImage: data.cover_image,
    tags: data.tag_list,
    canonical: data.canonical_url,
    viewCount: data.page_views_count,
    collectionId: data.collection_id || -1,
    user: data.user,
    slug,
    markdown,
  };
  return article;
};

// Get all users articles from Dev.to and filter by ones with a canonical URL to your blog
export const getAllArticles = async () => {
  const params = { username, per_page: 1000 };
  const headers = { 'api-key': process.env.DEVTO_APIKEY };
  const { data }: AxiosResponse<DevToArticle[]> = await axios.get(`https://dev.to/api/articles/me`, {
    params,
    headers,
  });
  const articles: IArticle[] = data.map(convertDevtoResponseToArticle);
  return articles;
};

export const getArticleByPath = async (slug: string): Promise<IArticle> => {
  const { data }: AxiosResponse<DevToArticle> = await axios.get(
    `https://dev.to/api/articles/${username}/${slug}`,
  );
  return convertDevtoResponseToArticle(data);
};
