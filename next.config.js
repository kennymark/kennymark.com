const withImages = require('next-images')
const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withImages({
  esModule: true,
  webpack(config, options) {
    return config
  }
})


module.exports = withReactSvg({
  include: path.resolve(__dirname, 'src/images'),
  webpack(config, options) {
    return config
  }
})