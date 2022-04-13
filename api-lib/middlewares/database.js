import { MongoClient } from 'mongodb'
import path from 'path'
import fs from 'fs'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
global.mongo = global.mongo || {}

let indexesCreated = false
async function createIndexes(db) {
  await Promise.all([db.collection('dictionary')])
  indexesCreated = true
}

export async function getMongoClient() {
  let mongoOptions = {}
  if (process.env.NODE_ENV === 'production') {
    let mongoCertPath = path.resolve('./ca-certificate.crt')
    if (process.env.CA_CERT) {
      fs.writeFileSync(mongoCertPath, process.env.CA_CERT)
    }
    mongoOptions.sslCA = mongoCertPath
  }

  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(
      process.env.DATABASE_URL,
      mongoOptions
    )
  }
  // It is okay to call connect() even if it is connected
  // using node-mongodb-native v4 (it will be no-op)
  // See: https://github.com/mongodb/node-mongodb-native/blob/4.0/docs/CHANGES_4.0.0.md
  await global.mongo.client.connect()
  return global.mongo.client
}

export default async function database(req, res, next) {
  let mongoOptions = {}
  if (process.env.NODE_ENV === 'production') {
    let mongoCertPath = path.resolve('./ca-certificate.crt')
    if (process.env.CA_CERT) {
      fs.writeFileSync(mongoCertPath, process.env.CA_CERT)
    }
    mongoOptions.sslCA = mongoCertPath
  }

  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(
      process.env.DATABASE_URL,
      mongoOptions
    )
  }
  req.dbClient = await getMongoClient()
  req.db = req.dbClient.db() // this use the database specified in the MONGODB_URI (after the "/")
  if (!indexesCreated) await createIndexes(req.db)
  return next()
}
