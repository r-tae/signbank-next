declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      MONGO_URI: string
      DB_NAME: string
    }
  }
}

export {}
