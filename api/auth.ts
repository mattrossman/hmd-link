import type { NextApiRequest, NextApiResponse } from 'next'

import admin from '@/src/lib/admin'
import { digest, uniqueName } from '@/src/lib/obfuscate'

export type AuthResponse = {
  token: string
  room: string
}

export default async (req: NextApiRequest, res: NextApiResponse<AuthResponse>) => {
  const auth = admin.auth()
  const ip = req.headers['x-real-ip'] as string
  const buffer = digest(ip)
  const uid = buffer.toString('hex')

  const token = await auth.createCustomToken(uid)
  const room = uniqueName(buffer.readInt32BE())

  res.json({ token, room })
}
