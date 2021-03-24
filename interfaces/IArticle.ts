export interface IArticle {
  id: number
  title: string
  description: string
  publishedAt: string
  devToSlug: string
  devToPath: string
  devToURL: string
  commentsCount: number
  publicReactionsCount: number
  positiveReactionsCount: number
  coverImage: string
  tags: string[]
  canonical: string
  collectionId: number
  slug: string
  markdown: string
  body_markdown?: string;
  viewCount?: number;
  html?: string
  user?: any
}


export interface ICachedArticle {
  id: number
  slug: string
}




