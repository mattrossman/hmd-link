/** @type {import("@netlify/functions").Handler} */
export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Hello, World',
  }
}
