import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/dashboard/github')({
  server: {
    handlers: {
      GET: async () => {
        const userResponse = await fetch('https://api.github.com/users/kennymark');
        const reposResponse = await fetch(
          'https://api.github.com/users/kennymark/repos?per_page=100',
        );

        const user = await userResponse.json();
        const repositories = await reposResponse.json();
        const mine = repositories?.filter((repo: any) => !repo.fork) ?? [];
        const stars = mine.reduce(
          (acc: number, repository: any) => acc + repository.stargazers_count,
          0,
        );

        return new Response(JSON.stringify({ followers: user.followers, stars }), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
          },
          status: 200,
        });
      },
    },
  },
});
