exports.handler = async event => {
	const subject = event.queryStringParameters.name || 'World'
	console.log("yo dog");
	return {
		statusCode: 200,
		body: `Hello ${subject}!`,
	}
}