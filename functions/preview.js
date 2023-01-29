const { getLinkPreview } = require("link-preview-js");

exports.handler = async event => {
	try {
		const body = JSON.parse(event.body);
		let url = body.url
		if (!url.match(/https?:\/\//)) url = 'https://' + url;
		const preview = await getLinkPreview(url)
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