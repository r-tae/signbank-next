// TODO: this file is slated for deletion, project is switching to use a separate API instead of a NextJS backend

import { ApiRequest, ApiResponse } from 'additional'
import AWS from 'aws-sdk'
import formidable from 'formidable'
import nc from 'next-connect'

import {
  findDictionaryEntryByIdGloss,
  patchDictionaryEntryByIdGloss,
} from '@/api-lib/db'
import { database } from '@/api-lib/middlewares'
import { ncOpts } from '@/api-lib/nc'

const handler = nc(ncOpts)

// TODO: move this into middleware
const s3Client = new AWS.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: 'sgp1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
})

handler.use(database)

// TODO: right now there is no input validation, it's possible to change the DB data arbitrarily; correct typing does not fix this
handler.patch(async (req: any, res: any) => {
  const dictionaryEntry = await patchDictionaryEntryByIdGloss(
    req.db,
    req.query.id_gloss.toString(),
    req.body
  )

  if (!dictionaryEntry) {
    return res.status(404).json({ error: { message: 'Entry not found.' } })
  }

  return res.json({ dictionaryEntry })
})

// TODO: move to types folder
interface GetDictionaryEntryRequest extends ApiRequest {
  query: {
    id_gloss: string
  }
}

// TODO: move to types folder
interface GetDictionaryEntryResponse extends ApiResponse {}

handler.put(async (req: any, res: any) => {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    console.log({
      err,
      fields,
      files,
    })
  })
  return res.status(500).json({ error: 'none' })
  // return res.json({ hello: 'world'})
})

// TODO: only return the basic fields visible in the public view if not authenticated as researcher/lexicographer
handler.get(
  async (req: GetDictionaryEntryRequest, res: GetDictionaryEntryResponse) => {
    const dictionaryEntry = await findDictionaryEntryByIdGloss(
      req.db,
      req.query.id_gloss.toString()
    )

    if (!dictionaryEntry) {
      return res.status(404).json({ error: { message: 'Entry not found.' } })
    }

    return res.json({ dictionaryEntry })
  }
)

export default handler
