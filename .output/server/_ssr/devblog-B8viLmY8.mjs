import { a as axios } from "../_libs/axios.mjs";
const sanitizeDevToMarkdown = (markdown) => {
  let correctedMarkdown = "";
  const replaceSpaceCharRegex = new RegExp(String.fromCharCode(160), "g");
  correctedMarkdown = markdown.replace(replaceSpaceCharRegex, " ");
  const addSpaceAfterHeaderHashtagRegex = /##(?=[a-z|A-Z])/g;
  return correctedMarkdown.replace(addSpaceAfterHeaderHashtagRegex, "$& ");
};
const username = "kennymark";
const blogURL = "https://kennymark.com/blog/";
const portfolioURL = "https://wallis.dev/portfolio/";
const convertCanonicalURLToRelative = (canonical) => {
  if (canonical.startsWith(portfolioURL)) {
    return canonical.replace(portfolioURL, "");
  }
  return canonical.replace(blogURL, "");
};
const convertDevtoResponseToArticle = (data) => {
  const slug = convertCanonicalURLToRelative(data.canonical_url);
  const markdown = sanitizeDevToMarkdown(data.body_markdown);
  const article = {
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
    markdown
  };
  return article;
};
const getAllArticles = async () => {
  const params = { username, per_page: 1e3 };
  const headers = { "api-key": process.env.DEVTO_APIKEY };
  const { data } = await axios.get(`https://dev.to/api/articles/me`, { params, headers });
  const articles = data.map(convertDevtoResponseToArticle);
  return articles;
};
const getArticleByPath = async (slug) => {
  const { data } = await axios.get(`https://dev.to/api/articles/${username}/${slug}`);
  return data;
};
export {
  getArticleByPath as a,
  getAllArticles as g
};
