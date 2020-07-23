const admin = require('firebase-admin');
const generateUid = require('./helper/uid')

const getAdminAuth = () => {
	if (admin.apps.length == 0) {
		const key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
		admin.initializeApp({
			credential: admin.credential.cert(key),
			databaseURL: process.env.FIREBASE_DATABASE_URL
		});
	}
	return admin.auth()
}

exports.handler = async event => {
	const auth = getAdminAuth()
	const uid = generateUid()
	const token = await auth.createCustomToken(uid)
	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			uid,
			token
		})
	}
}