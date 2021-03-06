// TODO: this file is slated for deletion, project is switching to use a separate API instead of a NextJS backend

import type { Db } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { searchDictionaryEntries } from '@/api-lib/db'
import { database } from '@/api-lib/middlewares'
import { ncOpts } from '@/api-lib/nc'
import { DictionaryEntry } from '@/types/api/entry'

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
