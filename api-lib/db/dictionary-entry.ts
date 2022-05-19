import { Db } from 'mongodb'

export async function findDictionaryEntryByIdGloss(db: Db, idGloss: string) {
  const posts = await db
    .collection('dictionary')
    .aggregate([{ $match: { idGloss: idGloss } }, { $limit: 1 }])
    .toArray()
  if (!posts[0]) return null
  return posts[0]
}

export async function searchDictionaryEntries(db: Db, query: string) {
  const results = await db
    .collection('dictionary')
    .aggregate([
      {
        $match: {
          $or: [
            { idGloss: new RegExp(`${query}`, 'g') },
            { annotationIdGloss: new RegExp(`${query}`, 'g') },
            { 'keywords.text': new RegExp(`${query}`, 'g') },
          ],
        },
      },
    ])
    .toArray()
  if (results.length === 0) return null
  return results
}

export async function listIdGlosses(db: Db) {
  const entries = await db.collection('dictionary').aggregate().toArray()
  if (!entries) return null
  return entries
}
