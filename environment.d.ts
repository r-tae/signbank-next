declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      // TODO: revisit; some of these are no longer used
      MONGO_URI: string
      CA_CERT?: string
      DO_SPACES_URL: string
      DO_SPACES_ID: string
      DO_SPACES_SECRET: string
    }
  }
}

export {}
