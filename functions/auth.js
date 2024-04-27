const admin = require('firebase-admin');
const stringHash = require('string-hash')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');


const init = () => {
	if (admin.apps.length == 0) {
		const key = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
		admin.initializeApp({
			credential: admin.credential.cert(key),
			databaseURL: process.env.FIREBASE_DATABASE_URL
		});
	}
}

const getPublicIp = (headers) => {
	const ip = headers["cf-connecting-ip"]
					?? headers['x-nf-client-connection-ip']
					?? headers['client-ip'];
	return ip === '::1' ? '127.0.0.1' : ip;
}

const getUniqueName = (seed) => {
	return uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals],
		separator: '-',
		seed
	})
}

exports.handler = async event => {
	init();
	const auth = admin.auth()
	const uid = stringHash(getPublicIp(event.headers)).toString()
	const displayName = getUniqueName(uid)

	// Get or create user
	const user = await auth.getUser(uid)
		.catch(() => auth.createUser({ uid, displayName }))

	// Update room name as needed
	if (user.displayName !== displayName) {
		await auth.updateUser(uid, { displayName })
	}

	const token = await auth.createCustomToken(uid)

	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token })
	}
}