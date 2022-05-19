declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      MONGO_URI: string
      CA_CERT?: string
      DO_SPACES_URL: string
      DO_SPACES_ID: string
      DO_SPACES_SECRET: string
    }
  }
}

export {}
