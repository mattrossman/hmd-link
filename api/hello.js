/** @type {import("@netlify/functions").Handler} */
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Hello, World',
  }
}
