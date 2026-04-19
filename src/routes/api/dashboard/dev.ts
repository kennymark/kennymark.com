import { createFileRoute } from '@tanstack/react-router';
import { getAllArticles } from '../../../../lib/devblog';

export const Route = createFileRoute('/api/dashboard/dev')({
  server: {
    handlers: {
      GET: async () => {
        const articles = await getAllArticles();
        const total = articles.reduce((acc, item) => acc + (item.viewCount ?? 0), 0);
        const likes = articles.reduce((acc, item) => acc + item.positiveReactionsCount, 0);
        return Response.json({ total, likes });
      },
    },
  },
});
