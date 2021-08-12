import { VercelRequest, VercelResponse } from "@vercel/node"

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  res.send("Hello world")
}
