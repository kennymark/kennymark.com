
module.exports = {

  async redirects() {
    return [
      {
        source: '/v1',
        destination: "https://kennymark.github.io/",
        permanent: true,
      },
      {
        source: '/v2',
        destination: 'https://kenny-v3.netlify.app/',
        permanent: true,
      },
      {
        source: '/v3',
        destination: 'https://kenny-test.netlify.app/',
        permanent: true,
      },
      {
        source: '/stripe',
        destination: 'https://stripe-subscriptions.vercel.app/',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/mrkennymark',
        permanent: true,
      },
      {
        source: '/next-starter',
        destination: 'https://next-adonis.vercel.app/',
        permanent: true,
      },
      {
        source: '/petitions',
        destination: 'https://petitions.now.sh/',
        permanent: true
      },
      {
        source: '/mercado',
        destination: 'https://nuxt-mercado.now.sh/',
        permanent: true
      },
      {
        source: '/next-lite',
        destination: 'https://next-portfolio-git-dev-kennymmark.vercel.app/',
        permanent: false
      },
      {
        source: '/deal-finder',
        destination: 'https://deal-finder-knc7i20xg-kennymmark.vercel.app/',
        permanent: false
      },
      {
        source: '/sweetbnb',
        destination: 'https://sweet-bnb.vercel.app/',
        permanent: false
      },
      // {
      //   source: '/v5',
      //   destination: 'https://next-portfolio-git-dev-kennymmark.vercel.app/',
      //   permanent: true
      // }
    ]
  }
}
