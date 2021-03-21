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
        destination: 'https://kenny-v3.netlify.app/',
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
    ]
  }
}
