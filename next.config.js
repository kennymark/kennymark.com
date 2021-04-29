const redirects = require('./lib/redirects')

module.exports = {
  future: {
    webpack5: true
  },

  async redirects() {
    return redirects
  }
}
