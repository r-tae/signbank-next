import { Db } from 'mongodb'

export async function findDictionaryEntryByIdGloss(db: Db, idGloss: string) {
  const posts = await db
    .collection('dictionary')
    .aggregate([{ $match: { idGloss: idGloss } }, { $limit: 1 }])
    .toArray()
  if (!posts[0]) return null
  return posts[0]
}

export async function listIdGlosses(db: Db) {
  const posts = await db.collection('dictionary').aggregate().toArray()
  if (!posts) return null
  return posts
}
