import { findDictionaryEntryByIdGloss } from '@/api-lib/db'
import { database } from '@/api-lib/middlewares'
import { ncOpts } from '@/api-lib/nc'
import nc from 'next-connect'
import { ApiRequest, ApiResponse } from 'additional'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = nc(ncOpts)

handler.use(database)

interface GetDictionaryEntryRequest extends ApiRequest {
  query: {
    idGloss: string
  }
}

interface GetDictionaryEntryResponse extends ApiResponse {}

handler.get(
  async (req: GetDictionaryEntryRequest, res: GetDictionaryEntryResponse) => {
    const dictionaryEntry = await findDictionaryEntryByIdGloss(
      req.db,
      req.query.idGloss.toString()
    )

    if (!dictionaryEntry) {
      return res.status(404).json({ error: { message: 'Entry not found.' } })
    }

    return res.json({ dictionaryEntry })
  }
)

export default handler
