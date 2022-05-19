import { findDictionaryEntryByIdGloss } from '@/api-lib/db'
import { database } from '@/api-lib/middlewares'
import { ncOpts } from '@/api-lib/nc'
import nc from 'next-connect'
import { ApiRequest, ApiResponse } from 'additional'
import formidable from 'formidable'
import AWS from 'aws-sdk'

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

export const config = {
  api: {
    bodyParser: false,
  },
}

handler.use(database)

interface GetDictionaryEntryRequest extends ApiRequest {
  query: {
    id_gloss: string
  }
}

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
