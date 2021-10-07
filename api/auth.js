import admin from '@/lib/admin'
import { digest, uniqueName } from '@/lib/obfuscate'

/**
 * @typedef AuthResponse
 * @property {string} token
 * @property {string} room
 */

const getPublicIp = (headers) => {
  const ip = headers['x-nf-client-connection-ip'] || headers['client-ip']
  return ip === '::1' ? '127.0.0.1' : ip
}

/** @type {import("@netlify/functions").Handler} */
export const handler = async (event, context) => {
  const auth = admin.auth()
  const ip = getPublicIp(event.headers)
  const buffer = digest(ip)
  const uid = buffer.toString('hex')

  const token = await auth.createCustomToken(uid)
  const room = uniqueName(buffer.readInt32BE())

  /** @type {AuthResponse} */
  const response = { token, room }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  }
}
