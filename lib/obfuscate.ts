import { createHash } from 'crypto'

export function digest(text: string) {
  return createHash('sha256').update(text).digest('hex')
}
