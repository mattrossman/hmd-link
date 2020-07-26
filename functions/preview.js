const { getLinkPreview } = require("link-preview-js");

exports.handler = async event => {
	try {
		const body = JSON.parse(event.body);
		console.log(body)
		const preview = await getLinkPreview(body.url)
		return {
			statusCode: 200,
			body: JSON.stringify(preview),
		}
	}
	catch (error) {
		return {
			statusCode: 400,
			body: "Failed to fetch image preview",
		}
	}
}