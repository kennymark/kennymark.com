import { getAllArticles } from 'lib/devblog'

export default async (_, res) => {

  const articles = await getAllArticles()
  let total = 0
  let likes = 0

  articles.forEach(item => total += item.viewCount)
  articles.forEach(item => likes += item.positiveReactionsCount)


  res.json({ total, likes })

}