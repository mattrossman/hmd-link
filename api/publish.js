/** @typedef {import('@vercel/node').VercelRequest} VercelRequest */
/** @typedef {import('@vercel/node').VercelResponse} VercelResponse */

const admin = require('./utils/admin')

const db = admin.database()
const rooms = db.ref('rooms')

const crypto = require('crypto')
const Hashids = require('hashids')

/**
 * @typedef {object} LinkRequest
 * @property {string} url - The URL to publish
 *
 * POST /api/publish: Publish a link to your room under /rooms/[ip]
 * @param {VercelRequest} req
 * @param {VercelResponse} res
 */
module.exports = async (req, res) => {
  /** @type {LinkRequest}  */
  const body = req.body
  const ip = req.headers['x-real-ip']

  // Hash the IP to obfuscate it in the database
  const ipHashed = crypto.createHash('sha256').update(ip).digest('hex')

  // Use digest to obfuscate the URL in the database
  const hashids = new Hashids(ipHashed)
  const encoder = new TextEncoder()
  const arrayView = encoder.encode(body.url)
  const urlHashed = hashids.encode(...arrayView)

  await rooms.set({ [ipHashed]: urlHashed })
  res.send(`Published ${body.url} to room ${ip}`)
}
