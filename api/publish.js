const { VercelRequest, VercelResponse } = require('@vercel/node')
const admin = require('./utils/admin')

const db = admin.database()
const rooms = db.ref('/rooms')

/**
 * Publish a link to your room
 * @param {VercelRequest} req
 * @param {VercelResponse} res
 */
module.exports = async (req, res) => {
  /** @type {LinkRequest}  */
  const body = req.body
  const ip = req.headers['x-real-ip']

  try {
    await rooms.set({ [ip]: body.url })
    res.send(`Published ${body.url} to room ${ip}`)
  } catch (e) {
    res.status(400).send('Error calling /publish endpoint')
  }
}

/**
 * @typedef {object} LinkRequest
 * @property {string} url - The URL to publish
 */
