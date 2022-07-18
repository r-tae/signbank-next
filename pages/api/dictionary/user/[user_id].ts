import nc from 'next-connect'

import { ncOpts } from '@/api-lib/nc'
// import { database } from '@/api-lib/middlewares'

const handler = nc(ncOpts)
// handler.use(database)

handler.get(async (req: any, res: any) => {
  const results = req.query.query.toString()

  if (!results) {
    return res.status(404).json({ error: { message: 'No results found.' } })
  }

  return res.json(results)
})

export default handler
