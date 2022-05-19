import { searchDictionaryEntries } from '@/api-lib/db'
import { ncOpts } from '@/api-lib/nc'
import nc from 'next-connect'
import { database } from '@/api-lib/middlewares'

const handler = nc(ncOpts)
handler.use(database)

//searchDictionaryEntries

// TODO: make req and res models
handler.get(async (req: any, res: any) => {
  const results = await searchDictionaryEntries(
    req.db,
    req.query.query.toString()
  )

  if (!results) {
    return res.status(404).json({ error: { message: 'No results found.' } })
  }

  return res.json(results)
})

export default handler
