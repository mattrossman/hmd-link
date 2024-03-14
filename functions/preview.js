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
			headers: {
				// For 1 hour: serve cached copy
				// For 1 day: serve stale copy but revalidate in background
				'Cache-Control': 'public, max-age=3600, stale-while-revalidate 86400'
			}
		}
	}
	catch (error) {
		return {
			statusCode: 400,
			body: "Failed to fetch image preview",
		}
	}
}