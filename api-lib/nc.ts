import { Options } from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApiRequest, ApiResponse } from 'additional'

export const ncOpts: Options<ApiRequest, ApiResponse> = {
  onError: (err, req, res) => {
    console.error(err)
    res.statusCode =
      err.status && err.status >= 100 && err.status < 600 ? err.status : 500
    res.json({ message: err.message })
  },
}
