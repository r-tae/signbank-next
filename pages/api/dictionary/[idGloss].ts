import { ValidateProps } from '@/api-lib/constants'
import { findDictionaryEntryByIdGloss } from '@/api-lib/db'
import { database } from '@/api-lib/middlewares'
import { ncOpts } from '@/api-lib/nc'
import nc from 'next-connect'
const handler = nc(ncOpts)

handler.use(database)

handler.get(async (req, res) => {
  const dictionaryEntry = await findDictionaryEntryByIdGloss(
    req.db,
    req.query.idGloss
  )

  if (!dictionaryEntry) {
    return res.status(404).json({ error: { message: 'Entry not found.' } })
  }

  return res.json({ dictionaryEntry })
})

export default handler
