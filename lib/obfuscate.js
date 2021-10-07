import { createHash } from 'crypto'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

/**
 * @param {string} text
 */
export function digest(text) {
  return createHash('sha256').update(text).digest()
}

/**
 * @param {number} seed
 */
export function uniqueName(seed) {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    seed,
  })
}
