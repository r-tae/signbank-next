import type { NextApiRequest, NextApiResponse } from 'next'
import type { Db } from 'mongodb'

import { searchDictionaryEntries } from '@/api-lib/db'
import { ncOpts } from '@/api-lib/nc'
import nc from 'next-connect'
import { database } from '@/api-lib/middlewares'
// HACK: move types to types folder
import { DictionaryEntry } from '@/lib/dictionary/hooks'

const handler = nc(ncOpts)
handler.use(database)

type Request = NextApiRequest & { db: Db }
type Response = NextApiResponse<
  DictionaryEntry[] | { error: { message: string } }
>

// TODO: make req and res models
handler.get(async (req: Request, res: Response) => {
  const results = await searchDictionaryEntries(
    req.db,
    req.query.query?.toString() || '' // HACK: clean this up somehow
  )

  if (!results) {
    return res.status(404).json({ error: { message: 'No results found.' } })
  }

  return res.json(results)
})

export default handler
