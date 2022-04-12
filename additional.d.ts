import { Db } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage, ServerResponse } from 'http'

interface ApiRequest extends NextApiRequest {
  db: Db
}

interface ApiResponse extends NextApiResponse {}
