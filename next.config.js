const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  },
  include: path.resolve(__dirname, 'public/'),
  webpack(config, options) {
    return config
  },
  output: 'standalone',
})
