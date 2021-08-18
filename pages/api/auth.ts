import type { NextApiRequest, NextApiResponse } from 'next'

import admin from '@/lib/admin'
import { digest, uniqueName } from '@/lib/obfuscate'

export type AuthResponse = {
  token: string
  room: string
}

export default async (req: NextApiRequest, res: NextApiResponse<AuthResponse>) => {
  const auth = admin.auth()
  const ip = req.headers['x-real-ip'] as string
  const uid = digest(ip)
  const token = await auth.createCustomToken(uid)
  const room = uniqueName(parseInt(uid, 16))

  res.json({ token, room })
}
