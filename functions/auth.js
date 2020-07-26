const admin = require('firebase-admin');
const stringHash = require('string-hash')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');


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

const getPublicIp = (headers) => {
	const ip = headers['x-nf-client-connection-ip']
			|| headers['client-ip'];
	return ip === '::1' ? '127.0.0.1' : ip;
}

const getUniqueName = (seed) => {
	return uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals],
		separator: '-',
		seed
	})
}

const setupDisplayName = async (auth, uid) => {
	/* Make sure that the user exists and has a display name */
	let displayName = null
	try {
		const user = await auth.getUser(uid)
		displayName = user.displayName
		if (displayName === undefined) throw new Error('User exists but displayName is blank')
	}
	catch (_) {
		// If the user doesn't exist (error from getUser) or the displayName is blank, generate one
		displayName = getUniqueName(uid)
		auth.updateUser(uid, { displayName })
	}
	return displayName
}


exports.handler = async event => {
	const auth = getAdminAuth()
	const uid = stringHash(getPublicIp(event.headers)).toString()
	await setupDisplayName(auth, uid)
	const token = await auth.createCustomToken(uid)
	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token })
	}
}