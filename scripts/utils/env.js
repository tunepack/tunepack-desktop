if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

export const env = process.env.NODE_ENV
export const isDev = env === 'development'
export const isProd = env === 'production'
