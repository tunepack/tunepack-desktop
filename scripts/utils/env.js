if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const env = process.env.NODE_ENV
const isDev = env === 'development'
const isProd = env === 'production'

module.exports = {
  isDev,
  isProd
}
