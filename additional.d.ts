/// <reference types="next-react-svg" />

import { Db } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage, ServerResponse } from 'http'

export interface ApiRequest extends NextApiRequest {
  db: Db
}

export interface ApiResponse extends NextApiResponse {}
