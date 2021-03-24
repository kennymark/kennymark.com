import axios, { AxiosResponse } from 'axios';
import { IArticle } from 'interfaces/IArticle';

import { sanitizeDevToMarkdown } from './markdown';

const username = 'kennymark';
const blogURL = 'https://kennymark.com/blog/';
const portfolioURL = 'https://wallis.dev/portfolio/';



// Takes a URL and returns the relative slug to your website
export const convertCanonicalURLToRelative = (canonical: string) => {
  if (canonical.startsWith(portfolioURL)) {
    return canonical.replace(portfolioURL, '');
  }
  return canonical.replace(blogURL, '');
}

const convertDevtoResponseToArticle = (data: any): IArticle => {
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

  }
  return article;
}


// Get all users articles from Dev.to and filter by ones with a canonical URL to your blog
export const getAllArticles = async () => {
  const params = { username, per_page: 1000 };
  const headers = { 'api-key': process.env.DEVTO_APIKEY };
  const { data }: AxiosResponse = await axios.get(`https://dev.to/api/articles/me`, { params, headers });
  const articles: IArticle[] = data.map(convertDevtoResponseToArticle);
  return articles;
}




export const getArticleByPath = async (slug: string): Promise<IArticle> => {
  const { data }: AxiosResponse = await axios.get(`https://dev.to/api/articles/${username}/${slug}`);

  return data;
}


