import { createHash } from 'crypto'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

export function digest(text: string) {
  return createHash('sha256').update(text).digest('hex')
}

export function uniqueName(seed: number) {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    seed,
  })
}
