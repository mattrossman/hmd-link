/** @type {import("@netlify/functions").Handler} */
export const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event.headers),
  }
}
