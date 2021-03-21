module.exports = {
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: 'v1',
        destination: "https://kennymark.github.io/",
      },
      {
        source: '/v2',
        destination: 'https://kenny-v3.netlify.app/',

      },
      {
        source: '/v3',
        destination: 'https://kenny-v3.netlify.app/',

      },
      {
        source: '/stripe',
        destination: 'https://stripe-subscriptions.vercel.app/',

      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/mrkennymark',
      },
    ]
  }
}
