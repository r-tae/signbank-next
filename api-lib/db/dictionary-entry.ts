import {
  DetailDictionaryEntry,
  DictionaryEntryPreview,
  Keyword,
  PublicDictionaryEntry,
} from '@/types/api/entry'
import { IdGloss, DictionaryEntry as DbDictionaryEntry } from '@/types/db'
import { DictionaryEntry } from '@/types/api/entry'
import { Db } from 'mongodb'

// TODO: move to types dir
type DictionaryEntryPatchSet = {
  keywords: Keyword[]
}

export async function patchDictionaryEntryByIdGloss(
  db: Db,
  idGloss: string,
  patchSet: DictionaryEntryPatchSet
) {
  const posts = await db
    .collection('dictionary')
    .aggregate([{ $match: { idGloss: idGloss } }, { $limit: 1 }])
    .toArray()
  if (!posts[0]) return null

  const result = await db.collection('dictionary').updateOne(
    {
      idGloss,
    },
    { $set: patchSet }
  )
  return result
}

export async function findDictionaryEntryByIdGloss(
  db: Db,
  idGloss: string
): Promise<DetailDictionaryEntry | PublicDictionaryEntry | null> {
  const user = { canAccessDetailView: false }

  // TODO: modularise some of this, it shouldn't all be in the same function
  const entry = (
    await db
      .collection('dictionary')
      .aggregate<
        DbDictionaryEntry & {
          videoUrl: string
        }
      >([
        { $match: { idGloss: idGloss } },
        { $limit: 1 },
        // { $sortArray: { input: "videos", sortBy: { "version": -1 } } },
        {
          $addFields: {
            videoUrl: {
              $getField: {
                field: 'url',
                input: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$videos',
                        as: 'item',
                        cond: {
                          $eq: ['$$item.version', { $min: '$videos.version' }],
                        },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      ])
      .toArray()
  )[0]

  const relatedEntries = await db
    .collection('dictionary')
    .aggregate<DictionaryEntryPreview>([
      { $match: { idGloss: { $in: entry.relations.map((r) => r.sign) } } },
      {
        $project: {
          idGloss: true,
          videoUrl: {
            $getField: {
              field: 'url',
              input: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$videos',
                      as: 'item',
                      cond: {
                        $eq: ['$$item.version', { $min: '$videos.version' }],
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    ])
    .toArray()

  const relations = entry.relations.map((relation) => ({
    role: relation.role,
    entry: relatedEntries.find(
      (relatedEntry) => relatedEntry?.idGloss === relation?.sign
    ),
  }))

  console.log({ relations: entry.relations, relatedEntries })

  console.log(relations)

  if (!entry) return null

  let result: Nullable<DetailDictionaryEntry | PublicDictionaryEntry> = null
  if (user.canAccessDetailView) {
    result = {
      annotationIdGloss: entry.annotationIdGloss,
      aslGloss: entry.aslGloss,
      blend: entry.blend,
      bslGloss: entry.bslGloss,
      compound: entry.compound,
      definitions: entry.definitions,
      idGloss: entry.idGloss as IdGloss,
      isAslLoan: entry.isAslLoan,
      isBslLoan: entry.isBslLoan,
      keywords: entry.keywords,
      language: entry.language,
      morphology: entry.morphology,
      phonology: entry.phonology,
      proposedNewSign: entry.proposedNewSign,
      published: entry.published,
      relations: relations,
      sense: entry.sense,
      signedEnglishGloss: entry.signedEnglishGloss,
      signNumber: entry.signNumber,
      stemSignNumber: entry.stemSignNumber,
      videos: entry.videos,
      videoUrl: entry.videoUrl,
    } as DetailDictionaryEntry
  } else {
    result = {
      idGloss: entry.idGloss as IdGloss,
      videoUrl: entry.videoUrl,
      definitions: entry.definitions,
      keywords: entry.keywords,
      language: entry.language,
      relations: relations,
    } as PublicDictionaryEntry
  }

  return result
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
