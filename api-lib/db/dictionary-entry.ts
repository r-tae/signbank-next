import { Db } from 'mongodb'

export async function findDictionaryEntryByIdGloss(db: Db, idGloss: string) {
  const posts = await db
    .collection('dictionary')
    .aggregate([{ $match: { idGloss: idGloss } }, { $limit: 1 }])
    .toArray()
  if (!posts[0]) return null
  return posts[0]
}
