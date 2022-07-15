import type { NextApiRequest, NextApiResponse } from 'next'
import type { Db } from 'mongodb'
import nc from 'next-connect'

import { searchDictionaryEntries } from 'api-lib/db'
import { ncOpts } from 'api-lib/nc'
import { database } from 'api-lib/middlewares'
import { DictionaryEntry } from 'types/entry'
// HACK: move types to types folder

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
