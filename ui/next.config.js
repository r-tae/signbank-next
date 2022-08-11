const withReactSvg = require('next-react-svg')
const path = require('path')
const { i18n } = require('./next-i18next.config.js')


module.exports = withReactSvg({
  async rewrites() {
    if (process.env.NODE_ENV !== "production") {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.DEV_PROXY}api/:path*`
        }
      ]
    } else {
      return []
    }
  },
  publicRuntimeConfig: {
    SITE_NAME: process.env.SITE_NAME,
    STATIC_URL: process.env.STATIC_URL,
  },
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
  i18n,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "_variables.scss";`
  }
})
