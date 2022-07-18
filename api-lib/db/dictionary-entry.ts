import { DictionaryEntry } from '@types/entry'
import { Db } from 'mongodb'

export async function findDictionaryEntryByIdGloss(db: Db, idGloss: string) {
  const posts = await db
    .collection('dictionary')
    .aggregate([{ $match: { idGloss: idGloss } }, { $limit: 1 }])
    .toArray()
  if (!posts[0]) return null
  return posts[0]
}

type OptionalParams = {
  pattern: string
}

// TODO: move to utils folder or something
function escapeRegex(s: string) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

// TODO: prevent users from seeing things they shouldn't (perhaps with a filter after results are returned, though it would be more effecient to do it in the query)

export async function searchDictionaryEntries(
  db: Db,
  query: string,
  optionalParams?: OptionalParams
): Promise<DictionaryEntry[]> {
  if (optionalParams) {
    const { pattern } = optionalParams
  }

  query = escapeRegex(query)

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
  if (results.length === 0) return []
  return results as DictionaryEntry[]
}

export async function listIdGlosses(db: Db): Promise<DictionaryEntry[]> {
  const entries = await db.collection('dictionary').aggregate().toArray()
  if (!entries) return []
  return entries as DictionaryEntry[]
}
