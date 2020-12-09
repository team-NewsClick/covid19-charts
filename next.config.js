const path = require('path')

module.exports = {
  target: 'serverless',
  webpack: (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, 'src')
    return config
  },
  env: {
    API_URL_COUNTRY: process.env.API_URL_COUNTRY,
    API_URL_STATE: process.env.API_URL_STATE,
    API_URL_DISTRICT: process.env.API_URL_DISTRICT,
  },
}
